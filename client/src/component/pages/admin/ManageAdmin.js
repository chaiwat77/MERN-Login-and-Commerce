import React, { useState, useEffect } from "react";
import { Switch, Select, Tag, Modal, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";
//functions
import {
  listUser,
  changeStatus,
  changeRole,
  removeUser,
  resetPassword,
} from "../../functions/users";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  // console.log(user);
  const [data, setData] = useState([]);
  const [selectData, setSelectData] = useState([]);
  // console.log(data);

  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  // console.log(values);

  // ข้อมูลที่ใช้ Loop ใน dropdown
  const [drop, setDrop] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setIsModalOpen(true);
    setValues({ ...values, id: id });
  };
  const handleChangePassword = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    resetPassword(user.token, values.id, { values })
      .then((res) => {
        loadData(user.token);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listUser(authtoken)
      // ถ้ามีการติดต่อหลังบ้าน ควรมี then ด้วย
      .then((res) => {
        setData(res.data);
        setSelectData(res.data);
        const dataDrop = [...new Set(res.data.map((item) => item.role))];
        setDrop(dataDrop);
        // console.log(dataDrop);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleOnchange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    // console.log(value);
    changeStatus(user.token, value)
      .then((res) => {
        loadData(user.token);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const roleData = ["admin", "user"];

  const handleChangeRole = (e, id) => {
    let values = {
      id: id,
      role: e,
    };
    changeRole(user.token, values)
      .then((res) => {
        loadData(user.token);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are You sure Delete ?")) {
      removeUser(user.token, id)
        .then((res) => {
          loadData(user.token);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSelectRole = (e) => {
    const value = e.target.value;
    if (value == "all") {
      setSelectData(data);
    } else {
      const filterData = data.filter((item, index) => {
        return item.role == value;
      });
      // console.log(filterData);
      setSelectData(filterData);
    }
  };

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <MenubarAdmin />
        </div>

        <div class="col">
          <h1>Manage Admin</h1>

          <select onChange={(e) => handleSelectRole(e)}>
            <option value="all">all</option>
            {drop.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">username</th>
                <th scope="col">role</th>
                <th scope="col">status</th>
                <th scope="col">created</th>
                <th scope="col">updated</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {selectData.map((item, index) => (
                <tr>
                  <th scope="row">{item.username}</th>
                  <td>
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={item.role}
                      onChange={(e) => handleChangeRole(e, item._id)}
                    >
                      {roleData.map((item, index) => (
                        <Select.Option value={item} key={index}>
                          {item === "admin" ? (
                            <Tag color="#87d068">{item}</Tag>
                          ) : (
                            <Tag color="#f50">{item}</Tag>
                          )}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Switch
                      checked={item.enabled}
                      onChange={(e) => handleOnchange(e, item._id)}
                    />
                  </td>
                  <td>{moment(item.createdAt).locale("th").format("ll")}</td>
                  <td>
                    {moment(item.updatedAt)
                      .locale("th")
                      .startOf(item.updatedAt)
                      .fromNow()}
                  </td>
                  <td>
                    <DeleteOutlined onClick={() => handleRemove(item._id)} />
                    <EditOutlined onClick={() => showModal(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            title="Reset Password"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>New Password</p>
            <Input placeholder="New Password" onChange={handleChangePassword} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;

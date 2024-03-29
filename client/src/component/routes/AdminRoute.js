import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentAdmin } from '../functions/auth'
import LoadingToRedirect from './LoadingToRedirect'


const AdminRoute = ({children}) => {
    const { user } = useSelector((state) => ({...state}))
    const [ok, setOk] = useState(false)

        useEffect(()=>{
            if(user && user.token){
                currentAdmin(user.token)
                .then(res=>{
                    setOk(true)

                }).catch(err=>{
                    setOk(false)
                })
            }


        },[user])

    return ok
    ? children
    : <LoadingToRedirect/>
    }

export default AdminRoute
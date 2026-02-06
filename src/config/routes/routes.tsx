import { createBrowserRouter } from "react-router-dom";
import{ Feed}
import{Profile}
import{Explore}
import DefaultLayout from '../layout/DefaultLayout'
import {Login}


export const routes = createBrowserRouter(
    [
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/",
            element: <DefaultLayout></DefaultLayout>,
            children:[
                {
                    path: "",
                    element: <Feed></Feed>
                },
                 {
                    path: "explorer",
                    element: <Explore></Explore>
                },
                 {
                    path: "profile",
                    element: <Profile></Profile>
                },

            ]
        }
    ]
)
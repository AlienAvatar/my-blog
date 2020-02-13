import {Form, Icon, Input, Button, message, Layout, Typography} from 'antd';
import React from "react";
const { Title,Text} = Typography;

export const contactMe = () => {
    message.info( <Text>767808421<Icon type="dribbble-square" />qq.com</Text>)
};

export const param = {
    FEEDBACKTEXT : "feedback=",
    CONTACTTYPE : "contactType=",
};

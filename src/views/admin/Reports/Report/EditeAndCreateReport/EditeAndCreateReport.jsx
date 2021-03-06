import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { GET_REPORTS_BY_ID, EDITE_REPORTS, SET_EDITE_REPORT } from "../../../../../store/adminStore/actions/actionType"; 
import { createAction } from "../../../../../store/adminStore/actions/actions";
import { useForm } from "antd/lib/form/Form";
import './style.css';


const { Option } = Select;

const EditeAndCreateReport = () =>{

    const report = useSelector(state => state.adminReport.editeReport);
    
    const [type, setType] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = useForm();
    
    

    useEffect(() =>{
        dispatch(createAction(GET_REPORTS_BY_ID, id));
    }, []);

    useEffect(() =>{

        if(report) {
            form.setFieldsValue({
                messages: report.messages.map(item => {
                    return {en: item.en, ru: item.ru}
                }),
            })
            setType(report.type);
        }else{
            form.setFieldsValue({
                messages: [{en: undefined, ru: undefined}]
            });
        }
    }, [form, report]);


    const back = () =>{
        navigate(-1);
        if(report) dispatch(createAction(SET_EDITE_REPORT, null));
    }

    const types = [
        {title: 'Comment', value: 'comment'},
        {title: 'User', value: 'user'},
        {title: 'Event', value: 'event'},
    ]
        
    const onFinish = values => {
        values.type = type;
        dispatch( createAction(EDITE_REPORTS, {id, messages: values}));
    }

    return (
        <>
        <div className='title'>
                <Button type="primary" onClick={back}>
                    <ArrowLeftOutlined />
                </Button>
               <h2>Update reports</h2>
        </div>
        <Form name="dynamic_form_nest_item" 
            onFinish={onFinish} 
            autoComplete="off" 
            form={form}
        >
        
            <div className="labelInputs">
                <span>EN</span>
                <span>RU</span>
            </div>
            <Form.List name="messages">

                {(data, { add, remove }) => (
                <>
                {data.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">

                        <Form.Item  {...restField} name={[name, 'en']}
                            rules={[{ required: true, message: 'Missing first name' }]}
                        >
                            <Input placeholder='Enter EN report text' />
                        </Form.Item>

                        <Form.Item  {...restField} name={[name, 'ru']}
                            rules={[{ required: true, message: 'Missing last name' }]}
                        >
                            <Input placeholder='Enter RU report text' />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} className='delete'/>
                    </Space>
                ))}
               
                    <div className="addAndSelect"> 
                    <Form.Item name={['type']}>
                        <Select onChange={(value) => setType(value)}>
                            {(types.map(item => (
                                <Option key={item.value} >
                                    {item.title}
                                </Option>   
                            )))}
                        </Select>
                    </Form.Item> 
                    
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} className='addBtn'>
                            Add sights
                        </Button>
                    </Form.Item>
                    </div> 
               
                </>
            )}
            </Form.List>
                <Form.Item className="btnDiv">
                    <Button htmlType="reset" onClick={back}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
            </Form.Item>
        </Form>
        </>
    )
}

export default EditeAndCreateReport;



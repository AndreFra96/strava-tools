'use client'
/**
 * Utilizzato componente Form di ant design
 * @see https://ant.design/components/form
 */
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    first_id?: string;
    second_id?: string;
};

const ActivitiesForm: React.FC = () => (
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="ID attività"
            name="id_1"
            rules={[{ required: true, message: 'Inserire ID prima attività' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="ID attività"
            name="id_2"
            rules={[{ required: true, message: 'Inserire ID seconda attività' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Confronta
            </Button>
        </Form.Item>
    </Form>
);

export default ActivitiesForm;
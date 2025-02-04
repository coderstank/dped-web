import React, { useEffect, useState } from 'react';
import { Table, Image, Pagination } from 'antd';
import moment from 'moment';
import { getAllPayments } from '../api/auth';

function Payments() {

    const [data,setData] = useState([])
    const [limit,setLimit]=useState(50)
    const [page,setPage]=useState(1)
      const [pageDetails,setPageDetails]=useState({})
    const getAllRecords = async (limit,page) => {
      try {
         const { data } = await getAllPayments(limit,page);
         setPageDetails({...data,docs:[]})
         setData(data.docs)
      } catch (error) {
        notification.error({ message: error.message || "something went wrong" });
      }
    }
  

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (text,{payment_file}) => <Image width={50} src={payment_file} />, 
    },
    {
      title: 'Amount',
      dataIndex: 'payment_amount',
      key: 'payment_amount',
      render : (_,{payment_amount})=><p>₹{payment_amount}</p>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render:(_,{createdAt})=><p>{moment(createdAt).format('DD/MM/YYYY')}</p>
        },
  ];

    useEffect(()=>{
      getAllRecords(limit,page)
    },[limit,page])
  

  return (
    <div>
        <h2>Payments</h2>
      <Table dataSource={data} columns={columns} pagination={false} />
      <Pagination
      align="center"
      style={{marginTop:30}}
      total={pageDetails?.totalDocs}
      pageSize={pageDetails?.limit}
      onChange={page=>setPage(page)}
      />
    </div>
  );
}

export default Payments;

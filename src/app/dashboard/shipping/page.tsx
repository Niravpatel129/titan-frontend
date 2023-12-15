'use client';
import DashboardPageWrapper from '@/components/DashboardPageWrapper/DashboardPageWrapper';
import newRequest from '@/helpers/newRequest';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { use, useEffect } from 'react';

export default function ShippingPage() {
  const [selectedKeys, setSelectedKeys]: any = React.useState();
  const [ordersReadyToShip, setOrdersReadyToShip] = React.useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await newRequest.get('/orders/printed');
      setOrdersReadyToShip(res.data);
    };

    fetchOrders();
  }, []);

  const renderPendingOrders = ordersReadyToShip.map((order) => {
    console.log('🚀  order:', order);

    return (
      <TableRow key={order.id}>
        <TableCell>{order.name}</TableCell>
        <TableCell>{order.email}</TableCell>
        <TableCell>{order.line_items.length}</TableCell>
        <TableCell>{order.shipping_address.address1}</TableCell>
        <TableCell>{order.shipping_address.city}</TableCell>
        <TableCell>{order.shipping_address.province}</TableCell>
        {/* <TableColumn>{order.shipping_address.zip}</TableColumn> */}
        {/* <TableColumn>{order.shipping_address.country}</TableColumn> */}
      </TableRow>
    );
  });

  return (
    <DashboardPageWrapper>
      <Table
        aria-label='Example static collection table'
        selectionMode='multiple'
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn>Order #</TableColumn>
          <TableColumn>Customer Email</TableColumn>
          <TableColumn>Qty</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn>City</TableColumn>
          <TableColumn>State</TableColumn>
        </TableHeader>
        <TableBody>{renderPendingOrders}</TableBody>
      </Table>
    </DashboardPageWrapper>
  );
}

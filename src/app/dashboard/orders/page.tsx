'use client';
import React, { useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from '@nextui-org/react';
import newRequest from '@/helpers/newRequest';
import DownloadIcon from '@/assets/DownloadIcon';
import Image from 'next/image';
import UploadIcon from '@/assets/UploadIcon';

export default function Orders() {
  const [pendingOrders, setPendingOrders] = React.useState([]);
  const [prints, setPrints] = React.useState({});
  const [selectedKeys, setSelectedKeys]: any = React.useState();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await newRequest('/orders/pending');
      if (res.status !== 200) return console.error(res.data);
      setPendingOrders(res.data);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const myPrintsMap = {};

    pendingOrders.forEach((order) => {
      if (!order.line_items) return null;

      order.line_items.forEach((item) => {
        if (!item.title) return null;

        if (!myPrintsMap[item.title]) {
          myPrintsMap[item.title] = {
            title: item.title,
            quantity: 1,
            size: item.variant_title,
            front: item.front,
            back: item.back,
            sku: item.sku,
            image: item?.product?.image?.src,
          };
        } else {
          myPrintsMap[item.title].quantity += 1;
        }
      });
    });

    setPrints(myPrintsMap);
  }, [pendingOrders]);

  const renderPendingOrders: any = Object.keys(prints).map((print, index) => {
    if (!prints[print].image) return null;

    return (
      <TableRow key={index}>
        <TableCell>
          <div className='flex'>
            <Image src={prints[print].image} width={100} height={100} alt={print} />
            <div className='mt-8 ml-2'>
              <div className='font-semibold'>{print}</div>
              <div>{prints[print].sku}</div>
              <div>{prints[print].sku.includes('B') ? 'Black Tee' : 'White Tee'}</div>
            </div>
          </div>
        </TableCell>
        <TableCell>{prints[print].size}</TableCell>
        <TableCell>{prints[print].quantity}</TableCell>
        <TableCell>
          <Button isIconOnly color='success' aria-label='Like'>
            <UploadIcon />
          </Button>
        </TableCell>
        <TableCell>
          <Button isIconOnly color='danger' aria-label='Like'>
            <DownloadIcon />
          </Button>
        </TableCell>
        <TableCell>
          <Chip color='primary'>Pending</Chip>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Table
      aria-label='Example static collection table'
      selectionMode='multiple'
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader>
        <TableColumn>Design</TableColumn>
        <TableColumn>Size</TableColumn>
        <TableColumn>Qty</TableColumn>
        <TableColumn>Front</TableColumn>
        <TableColumn>Back</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>{renderPendingOrders}</TableBody>
    </Table>
  );
}

'use client';
import DownloadIcon from '@/assets/DownloadIcon';
import UploadIcon from '@/assets/UploadIcon';
import DashboardPageWrapper from '@/components/DashboardPageWrapper/DashboardPageWrapper';
import isAuth from '@/components/IsAuth/IsAuth';
import newRequest from '@/helpers/newRequest';
import {
  Button,
  Chip,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect } from 'react';

function Orders() {
  const [pendingOrders, setPendingOrders] = React.useState([]);
  const [prints, setPrints] = React.useState({});
  const [selectedKeys, setSelectedKeys]: any = React.useState();
  const [printQuantity, setPrintQuantity]: any = React.useState(1);

  const fetchOrders = async () => {
    const res = await newRequest('/orders/pending');
    if (res.status !== 200) return console.error(res.data);
    setPendingOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const myPrintsMap = {};

    pendingOrders.forEach((order) => {
      order.line_items.forEach((item) => {
        if (!item?.sku?.includes('B') && !item?.sku?.includes('W')) return null;
        if (!myPrintsMap[item.title]) {
          myPrintsMap[item.title] = {
            title: item.title,
            quantity: 1,
            size: item.variant_title,
            front: item.front,
            back: item.back,
            sku: item.sku,
            image: item?.product?.image?.src,
            orders: [order.id],
            status: 'pending',
          };
        } else {
          myPrintsMap[item.title].quantity += 1;
          myPrintsMap[item.title].orders.push(order.id);
        }
      });
    });

    setPrints(myPrintsMap);
  }, [pendingOrders]);

  const handlePrint = (items) => {
    const updatedPrintsStatus = { ...prints };
    updatedPrintsStatus[items.title].status = 'printing';

    setPrints(updatedPrintsStatus);
  };

  const handlePrintComplete = async (prints) => {
    const ordersThatArePrinted = prints.orders.slice(0, printQuantity);

    try {
      const res = await newRequest.post('/readyOrders/addOrderToPrinted', {
        shopifyOrderId: ordersThatArePrinted,
        status: 'printed',
      });

      console.log('🚀  res:', res);
      setTimeout(() => {
        fetchOrders();
      }, 500);
    } catch (err) {
      console.error(err);
    }
  };

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
          <Button
            isIconOnly
            color='danger'
            aria-label='Like'
            onClick={() => {
              handlePrint(prints[print]);
            }}
          >
            <UploadIcon />
          </Button>
        </TableCell>
        <TableCell>
          <Button isIconOnly color='danger' aria-label='Like' isDisabled={true}>
            <DownloadIcon />
          </Button>
        </TableCell>
        <TableCell>
          <Popover
            placement='bottom'
            showArrow
            offset={10}
            onClose={() => {
              setPrintQuantity(1);
            }}
          >
            <PopoverTrigger>
              <Chip color='primary'>
                <span className='capitalize'>{prints[print].status}</span>
              </Chip>
            </PopoverTrigger>
            <PopoverContent className='w-[240px]'>
              {(titleProps) => (
                <div className='px-1 py-2 w-full'>
                  <p className='text-small font-bold text-foreground' {...titleProps}>
                    Complete Prints
                  </p>
                  <div className='mt-2 flex flex-col gap-2 w-full'>
                    <Input
                      label={`Quantity - Req: ${prints[print].quantity}`}
                      size='sm'
                      variant='bordered'
                      // max={prints[print].quantity}
                      // min={1}
                      value={printQuantity}
                      onValueChange={(value) => {
                        setPrintQuantity(value);
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      color='danger'
                      className='mt-2 w-full'
                      onClick={() => {
                        handlePrintComplete(prints[print]);
                      }}
                    >
                      Complete
                    </Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </TableCell>
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
          <TableColumn>Design</TableColumn>
          <TableColumn>Size</TableColumn>
          <TableColumn>Qty</TableColumn>
          <TableColumn>Front</TableColumn>
          <TableColumn>Back</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody>{renderPendingOrders}</TableBody>
      </Table>
    </DashboardPageWrapper>
  );
}

export default isAuth(Orders);

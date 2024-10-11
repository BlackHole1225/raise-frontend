'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown';
import { Pagination } from '@nextui-org/pagination';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { User } from '@nextui-org/user';
import { Chip } from '@nextui-org/chip';
import { SearchIcon } from 'lucide-react';
import { SERVER_IP } from '@/utils/constants';
import {useRouter} from 'next/navigation'
import axios from 'axios';
import { SERVER_LOCAL_IP } from '../../../../../utils/constants';
// Mock data - replace with your actual data fetching logic
const mockData = [
  {
    id: 1,
    name: 'Eco Fundraiser',
    category: 'Environment',
    createdAt: '2023-08-15',
    goal: 10000,
    bannerImage: '/eco-banner.jpg',
    kycStatus: 'Verified'
  },
  {
    id: 2,
    name: 'Tech for Kids',
    category: 'Education',
    createdAt: '2023-09-01',
    goal: 5000,
    bannerImage: '/tech-kids.jpg',
    kycStatus: 'Pending'
  }
  // Add more mock data as needed
];

const columns = [
  { name: 'CAMPAIGN NAME', uid: 'title' },
  { name: 'CATEGORY', uid: 'categoryId' },
  { name: 'CREATED AT', uid: 'createdAt' },
  { name: 'GOAL', uid: 'amount' },
  { name: 'KYC STATUS', uid: 'kycStatus' },
  { name: 'ACTIONS', uid: 'actions' }
];

const CampaignDataTable = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(new Set(['All']));
  const [selectedKycStatus, setSelectedKycStatus] = useState(new Set(['All']));
  const [campaigns, setCampaigns] = useState([]);
  const router = useRouter();
  const filteredData = useMemo(() => {
    // Start with the initial campaigns data
    let filteredCampaigns = campaigns;
  
    // Filter by search term if provided
    if (searchTerm) {
      filteredCampaigns = filteredCampaigns.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Filter by selected categories if "All" is not selected
    if (!selectedCategories.has('All')) {
      filteredCampaigns = filteredCampaigns.filter((item) =>
        selectedCategories.has(item.categoryId)
      );
    }
  
    // Filter by selected KYC status if "All" is not selected
    if (!selectedKycStatus.has('All')) {
      filteredCampaigns = filteredCampaigns.filter((item) =>
        selectedKycStatus.has(item.kycStatus)
      );
    }
  
    // Return the final filtered result
    return filteredCampaigns;
  }, [searchTerm, selectedCategories, selectedKycStatus, campaigns]);
  console.log(filteredData);
  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData, rowsPerPage]);

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: item.bannerImage }}
            description={item.category}
            name={cellValue}
          >
            {item.name}
          </User>
        );
      case 'goal':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">USD</p>
          </div>
        );
      case 'kycStatus':
        return (
          <Chip
            className="capitalize"
            color={item.kycStatus === 'Verified' ? 'success' : 'warning'}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Button size="sm" radius="full" onClick={()=>router.push(`/account/my-campaigns/${item._id}`)}>
              View
            </Button>
            <Button size="sm" radius="full"  onClick={()=>router.push(`/account/edit-a-campaign/${item._id}`)}>
              Edit
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  };
  const getCampaigns = async () => {
    const response = await axios.get(`${SERVER_LOCAL_IP}/api/campaign`);
    setCampaigns(response.data.data.map((d)=>({...d, kycStatus:d.kyc[0]?.verify||"not yet"})))
  }
  useEffect(() => {
    getCampaigns();
  }, [])


  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon className="text-default-300" />}
          value={searchTerm}
          onValueChange={setSearchTerm}
          variant="bordered"
          radius="full"
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" radius="full">
                Categories
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Category selection"
              selectionMode="multiple"
              selectedKeys={selectedCategories}
              onSelectionChange={setSelectedCategories}
            >
              <DropdownItem key="All">All</DropdownItem>
              <DropdownItem key="Environment">Environment</DropdownItem>
              <DropdownItem key="Education">Education</DropdownItem>
              {/* Add more categories as needed */}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" radius="full">
                KYC Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="KYC status selection"
              selectionMode="multiple"
              selectedKeys={selectedKycStatus}
              onSelectionChange={setSelectedKycStatus}
            >
              <DropdownItem key="All">All</DropdownItem>
              <DropdownItem key="Verified">Verified</DropdownItem>
              <DropdownItem key="Pending">Pending</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <Table
        classNames={{
          wrapper: 'rounded-none',
          tr: 'rounded-none',
          th: '!rounded-none'
        }}
        aria-label="Example table with custom cells"
        bottomContent={
          <div className="flex w-full justify-end">
            <Pagination
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
              size="lg"
              classNames={{
                item: '!rounded-none border border-brand-olive-green bg-transparent hover:!bg-transparent',
                cursor: '!rounded-none bg-brand-olive-green'
              }}
            />
          </div>
        }
      >
        <TableHeader columns={columns} className="rounded-none">
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignDataTable;

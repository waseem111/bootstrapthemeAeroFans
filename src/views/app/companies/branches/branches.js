import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid'
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import CompanyService from '../../../services/companyservices';
import Notify from '../../../components/notify/notify';
import { Table } from "antd";
import Confirmation from '../../../components/confirmation/confirmation';
import Modal from "react-modal";
Modal.setAppElement("#root");
const Branches = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [notify, setNotify] = useState({ options: [], visible: false });

    const columns = [
        {
            title: 'Branch #',
            dataIndex: 'cb_no',
            key: 'cb_no',
            sorter: true
        },
        {
            title: 'Branch Name',
            dataIndex: 'com_branch_name',
            key: 'com_branch_name',
            sorter: true
        },
        {
            title: 'Contact Name',
            dataIndex: 'primary_contact_name',
            key: 'primary_contact_name',
        },
        {
            title: 'Contact Phone No',
            dataIndex: 'primary_contact_phone_no',
            key: 'primary_contact_phone_no',
        },
        {
            title: 'Contact Email',
            dataIndex: 'primary_contact_email',
            key: 'primary_contact_email',
        },
        {
            title: 'Action',
            dataIndex: 'cb_id',
            key: 'cb_id',
            render: (record) => <>
                <button className='btn btn-primary mr-10' onClick={() => navigate('/editbranch/' + record)} ><FontAwesomeIcon icon={faEdit} /></button>
                <button className='btn btn-danger' onClick={() =>{setSelectedId(record);}} ><FontAwesomeIcon icon={faTrash} /></button>
            </>,
        },
    ];

    const [listData, setListData] = useState({
        data: [],
        pagination: null,
        sortField: null,
        sortOrder: null,
        filter: null,
        loading: true,
        tableChange: false,
    });

    const [lookupCompanies, setLookupCompanies] = useState([]);

    const fetch = async (params = {}) => {
        setListData((prev) => ({ ...prev, loading: true }));
        await CompanyService.getbranches({
            ...params,
        })
            .then(
                (resp) => {
                    if (resp.is_success) {
                        const pagination = { ...listData.pagination };
                        pagination.total = resp?.count;
                        pagination.current = resp?.current_page;
                        pagination.pageSize = pagination.pageSize === undefined ? 10 : pagination.pageSize;
                        setListData((prev) => ({
                            ...prev,
                            data: resp?.data,
                            loading: false,
                            pagination: pagination,
                        }));
                    }
                    else {
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "danger",
                                message: resp?.message
                            }, visible: true
                        }));
                    }
                },
                (err) => {
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };


    const getcompanies = async () => {
        await CompanyService.getcompanies({
            size: 9999,
            page: 1,
        })
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setLookupCompanies(resp?.data);
                    }
                    else {
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "danger",
                                message: resp?.message
                            }, visible: true
                        }));
                    }
                },
                (err) => {
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };


    const handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...listData.pagination };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        setListData((prev) => ({
            ...prev,
            tableChange: true,
            pagination: pager,
            sortField: sorter.field,
            sortOrder: sorter.order,
        }));
    };


    useEffect(() => {
        if (listData.tableChange) {
            fetch({
                size: listData.pagination.pageSize,
                page: listData.pagination.current,
                search: listData.search,
                sortField: listData.sortField,
                sortOrder: listData.sortOrder,
                ...listData.filter,
            });
            setListData((prev) => ({ ...prev, tableChange: false }));
        }
    }, [listData]);

    const handleCompanyFilter = (e) => {
        const filters = { ...listData.filter };
        filters.com_id = e.target.value;
          setListData((prev) => ({
            ...prev,
            tableChange: true,
            filter: filters,
          }));
    
    }


    const onPageLoad = () => {
        Promise.all([
            getcompanies(),
        ]).then(() => {
            if(id){
                const filters = { ...listData.filter };
                filters.com_id = id;
                fetch({
                    size: 10,
                    page: 1,
                    search: listData.search,
                    sortField: listData.sortField,
                    sortOrder: listData.sortOrder,
                    ...filters,
                });
            }
            else{
                fetch({
                    size: 10,
                    page: 1,
                    search: listData.search,
                    sortField: listData.sortField,
                    sortOrder: listData.sortOrder,
                    ...listData.filter,
                });
            }
        });
    };

    useEffect(() => onPageLoad(), []);

    useEffect(() => {
        if (notify.visible) {
            setTimeout(() => { setNotify((prev) => ({ ...prev, visible: false })); }, 3000);
        }
    }, [notify]);

    const [selectedId, setSelectedId] = useState(null);
    useEffect(() => {
        if(selectedId)
            setIsOpen(true);
    }, [selectedId]);
    const [isOpen, setIsOpen] = useState(false);
    function toggleModal() {
        setIsOpen(!isOpen);
    }
    const handleDelete = async () => {
        await CompanyService.deletebranch(selectedId)
          .then((resp) => {
            if (resp.is_success) {
                setSelectedId(null);
                setIsOpen(false);
                fetch({
                    size: 10,
                    page: 1,
                    search: listData.search,
                    sortField: listData.sortField,
                    sortOrder: listData.sortOrder,
                    ...listData.filter,
                });
              setNotify((prev) => ({
                ...prev, options: {
                  type: "success",
                  message: resp?.message
                }, visible: true
              }));
            }
            else {
                setSelectedId(null);
              setNotify((prev) => ({
                ...prev, options: {
                  type: "danger",
                  message: resp?.message
                }, visible: true
              }));
            }
    
          })
          .catch((err) => {
            setSelectedId(null);
            setNotify((prev) => ({
              ...prev, options: {
                type: "danger",
                message: err?.message
              }, visible: true
            }));
          });
      };

    return (
        <>
            <Header />
            <LeftSideBar />
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Branches</h1>
                    <div className="page-content">
                    {!id && <div className="row">
                            <div className="form-group col-md-4 ">
                                <label>Company</label>
                                <select
                                    className="form-control"
                                    defaultValue=""
                                    name="com_id"
                                    onChange={(e) => handleCompanyFilter(e)}
                                >
                                    <option value="">Select Company</option>
                                    {lookupCompanies?.map((elm) => (
                                        <option key={elm.com_id} value={elm.com_id}>
                                            {elm.com_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>}
                        {id && <div className="row">
                            <div className="form-group col-md-4 ">
                                <label>Company</label>
                                <select
                                    className="form-control"
                                    disabled={true}
                                    value={id}
                                    name="com_id"
                                    onChange={(e) => handleCompanyFilter(e)}
                                >
                                    <option value="" disabled>Select Company</option>
                                    {lookupCompanies?.map((elm) => (
                                        <option key={elm.com_id} value={elm.com_id}>
                                            {elm.com_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>}


                        <Table
                            columns={columns}
                            rowKey={new Date().getTime()}
                            dataSource={listData.data}
                            pagination={listData.pagination}
                            loading={listData.loading}
                            // pagination={{
                            //     pageSizeOptions: ['10', '50', '100'],
                            //     showSizeChanger: true,
                            //     pageSize: 10,
                            //     ...listData.pagination
                            //     }}
                            onChange={handleTableChange}
                        />
                    </div>

                </div>
            </main>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
            >
                <Confirmation onClose={toggleModal} onDelete={handleDelete} notification={notify} id={selectedId}/>
            </Modal>
        </>
    )
};

export default Branches;
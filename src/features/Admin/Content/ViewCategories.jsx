import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MainContext from '../../../context/MainContext';
import Loader from '../../../utils/Loader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TextField1 = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField1
            id="search"
            type="text"
            placeholder="Filter By Category"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <ClearButton type="button" onClick={onClear}>
            X
        </ClearButton>
    </>
);

const Viewcategories = (props) => {
    const [value1, setValue1] = useState({
        category1: ''
    });

    const [value2, setValue2] = useState({
        id: '',
        category2: ''
    });
    const [data, setData] = useState([]);
    const context = useContext(MainContext);
    const [finFlag, setFinFlag] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const [openEdit, setOpenEdit] = React.useState(false);
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const handleOpenEdit = (e) => {
        setOpenEdit(true);
        console.log(e);
        setValue2({
            id: e.id,
            category2: e.name
        })
    };

    const handleCloseEdit = () => setOpenEdit(false);

    useEffect(() => {
        getData();
    }, [finFlag]);

    const deleteData = async (id) => {
        console.log(id);
        let c = window.confirm('Do you really want to delete?')
        if (c) {
            const ans = await context.deleteCategory(id);
            console.log(ans);
            if (ans.status) {
                props.showAlert(true);
                setFinFlag(!finFlag);
            }
            else {
                props.showAlert(false);
            }
        }
    };

    const getData = async () => {
        const ans = await context.getCategory("POST");
        console.log(ans.data);
        setData(ans.data);
    };

    const columns = [
        {
            name: <h3>Category Name</h3>,
            selector: row => row.name,
            sortable: true,
            grow: 5
        },
        {
            name: <h3>Actions</h3>,
            cell: (e) => {
                return (
                    <div className="row">
                        <div style={{ marginRight: "2px", cursor: "pointer" }} onClick={() => {
                            handleOpenEdit(e)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </div>
                        <div onClick={() => {
                            deleteData(e.id);
                        }} style={{ marginLeft: "2px", cursor: "pointer" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                        </div>
                    </div>
                )
            },
            grow: 1
        }
    ];

    // const data = [
    //     {
    //         id: 1,
    //         title: 'Category 1',
    //     },
    //     {
    //         id: 2,
    //         title: 'Category 2'
    //     },
    //     {
    //         id: 3,
    //         title: 'Category 3'
    //     },
    //     {
    //         id: 4,
    //         title: 'Category 4'
    //     }
    // ];

    const filteredItems = data.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    const handleChange1 = (e) => {
        setValue1({ ...value1, [e.target.name]: e.target.value });
    };

    const handleChange2 = (e) => {
        setValue2({ ...value2, [e.target.name]: e.target.value });
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        setIsLoad(true);
        console.log(value1);
        const ans = await context.createCategory({
            type: 'POST',
            parent_id: 'test',
            name: value1.category1,
            description: 'test',
            status: 'test',
            created_by_user: 'test'
        });
        console.log(ans);
        if (ans.status) {
            props.showAlert(true);
            setFinFlag(!finFlag);
            handleCloseAdd();
        }
        else {
            props.showAlert(false);
        }
        setIsLoad(false);
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setIsLoad(true);
        console.log(value2);
        const ans = await context.updateCategory({
            id: value2.id,
            type: 'POST',
            parent_id: 'test',
            name: value2.category2,
            description: 'test',
            status: 'test'
        });
        if (ans.status) {
            setFinFlag(!finFlag);
            props.showAlert(true);
            handleCloseEdit();
        }
        else {
            props.showAlert(false);
        }
        setIsLoad(false);
    };

    return (
        <>
            <Modal
                open={openAdd}
                onClose={handleCloseAdd}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Category
                    </Typography>
                    <form onSubmit={handleSubmit1}>
                        <div style={{ marginBottom: "12px" }}>
                            <h3>Title</h3>
                            <TextField id="category1" label="Category" sx={{ width: "100%" }} name="category1" onChange={handleChange1} value={value1.category1} variant="outlined" required />
                        </div>
                        <Button disabled={isLoad} type="submit" color="primary" variant="contained">Submit</Button>
                    </form>
                </Box>
            </Modal>

            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Category
                    </Typography>
                    <form onSubmit={handleSubmit2}>
                        <div style={{ marginBottom: "12px" }}>
                            <h3>Title</h3>
                            <TextField id="category2" label="Category" sx={{ width: "100%" }} name="category2" onChange={handleChange2} value={value2.category2} variant="outlined" required />
                        </div>
                        <Button disabled={isLoad} type="submit" color="primary" variant="contained">Submit</Button>
                    </form>
                </Box>
            </Modal>
            <div>
                {isLoad ? <Loader /> : null}
                <Button onClick={handleOpenAdd} variant="contained">
                    Add Category
                </Button>
                <div>
                    <DataTable
                        title="View Categories"
                        columns={columns}
                        data={filteredItems}
                        pagination
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                    />
                </div>
            </div>
        </>
    )
}

export default Viewcategories;

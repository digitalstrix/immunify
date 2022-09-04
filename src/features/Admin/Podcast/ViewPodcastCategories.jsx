import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

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

const Viewpodcastcategories = () => {
    const [value1, setValue1] = useState({
        category1: ''
    });

    const [value2, setValue2] = useState({
        category2: ''
    });
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = (e) => {
        setOpenEdit(true);
        console.log(e);
        setValue2({
            category2:e.title
        })
    }
    const handleCloseEdit = () => setOpenEdit(false);

    const columns = [
        {
            name: <h3>Category Name</h3>,
            selector: row => row.title,
            sortable: true
        },
        {
            name: <h3>Menu</h3>,
            cell: (e) => {
                return (
                    <div className="row">
                        <div style={{ marginRight: "2px", cursor: "pointer" }} onClick={() => {
                            handleOpenEdit(e);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </div>
                        <div style={{ marginLeft: "2px", cursor: "pointer" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                        </div>
                    </div>
                )
            }
        }
    ];

    const data = [
        {
            id: 1,
            title: 'Category 1',
        },
        {
            id: 2,
            title: 'Category 2'
        },
        {
            id: 3,
            title: 'Category 3'
        },
        {
            id: 4,
            title: 'Category 4'
        }
    ];

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = data.filter(
        item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
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

    const handleSubmit1 = (e) => {
        e.preventDefault();
        console.log(value1);
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        console.log(value2);
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
                        <div style={{marginBottom:"12px"}}>
                            <h3>Title</h3>
                            <TextField id="category1" label="Category" sx={{ width: "100%" }} name="category1" onChange={handleChange1} value={value1.category1} variant="outlined" />
                        </div>
                        <Button type="submit" color="primary" variant="contained">Submit</Button>
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
                        <div style={{marginBottom:"12px"}}>
                            <h3>Title</h3>
                            <TextField id="category2" label="Category" sx={{ width: "100%" }} name="category2" onChange={handleChange2} value={value2.category2} variant="outlined" />
                        </div>
                        <Button type="submit" color="primary" variant="contained">Submit</Button>
                    </form>
                </Box>
            </Modal>

            <div>
                <Button onClick={handleOpenAdd} variant="contained" color="info">
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

export default Viewpodcastcategories;

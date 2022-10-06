import React, { useContext, useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainContext from '../../../context/MainContext';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

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
            placeholder="Filter "
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <ClearButton type="button" onClick={onClear}>
            X
        </ClearButton>
    </>
);

const Viewquestion = (props) => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [data, setData] = useState([]);
    const context = useContext(MainContext);

    useEffect(() => {
        // console.log(context.a);
        getData();
    }, []);

    const getData = async () => {
        const ans = await context.getQuestion();
        console.log(ans.data);
        setData(ans.data);
    };

    const deleteData = async (id) => {
        console.log(id);
        const ans = await context.deleteQuestion(id);
        console.log(ans);
        if (ans.status) {
            props.showAlert(true);
        }
        else {
            props.showAlert(false);
        }
    };

    const columns = [
        {
            name: <h3>ID</h3>,
            selector: row => row.id,
            sortable: true,
            grow: 1
        },
        {
            name: <h3>Title</h3>,
            selector: row => row.question,
            sortable: true,
            grow: 1
        },
        {
            name: <h3>Last Modified</h3>,
            selector: row => new Date(row.updatedAt).toLocaleDateString(),
            sortable: true,
            grow: 1
        },
        {
            name: <h3>Status</h3>,
            selector: row => row.status,
            sortable: true,
            grow: 1
        },
        {
            name: <h3>Action</h3>,
            cell: (e) => {
                return (
                    <div>
                        <NavLink to={`/question-detail/${e.id}`} style={{ textDecoration: "none" }}>
                            <Button sx={{padding:"3px 3px", fontSize:"11px"}} variant="contained">
                                View
                            </Button>
                        </NavLink>
                    </div>
                )
            },
            grow: 0.3
        }
    ];

    const filteredItems = data.filter(
        item => item.id && item.id === (filterText.toLowerCase()) || item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) || item.updatedAt && item.updatedAt.toLowerCase().includes(filterText.toLowerCase()) || item.status && item.status.toLowerCase().includes(filterText.toLowerCase()),
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

    return (
        <>
            <h1>View Questions</h1>
            <div>
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                />
            </div>
        </>
    )
}

export default Viewquestion;

/*

                {data ? data.map((e, index) => {
                    return (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{e.question}</Typography>

                                <b style={{ marginLeft: "20px", marginTop: "1px" }}>Category 1</b>
                                <b style={{ marginLeft: "20px", marginTop: "1px" }}>{e.status}</b>
                                <div style={{ marginLeft: "40px", marginTop: "4px" }}>
                                    <NavLink to={`/edit-question/${e.id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" style={{ marginRight: "5px" }} viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </NavLink>
                                    <svg onClick={deleteData} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {data1.findIndex(x => x.QuestionId === e.id) !== -1 ? data1[data1.findIndex(x => x.QuestionId === e.id)].answer : " - "}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                }) : null}

*/
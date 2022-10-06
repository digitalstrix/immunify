import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './index.css';
import MainContext from '../../../context/MainContext';

const Questiondetail = () => {
    const { id } = useParams();
    const context = useContext(MainContext);
    const [data, setData] = useState({});
    const [data1, setData1] = useState([]);
    useEffect(() => {
        // console.log(id);
        getQuestion(id);
    }, []);

    const getQuestion = async (id) => {
        const ans = await context.getQuestion(id);
        const ans1 = await context.getAnswer(id);
        console.log(ans1);
        setData(ans.data[0]);
        setData1(ans1.data);
    };

    return (
        <>
            {Object.keys(data).length > 0 ? <div className="blog-main">
                <div className="title question-title">
                    <h1>{data.question}</h1>
                </div>
                <div className="content">
                    {data1.map((e,index)=>{
                        return (
                            <div key={index} className="answer">
                                {e.answer}
                            </div>
                        )
                    })}
                </div>
            </div> : "Loading ..."}
        </>
    )
}

export default Questiondetail;

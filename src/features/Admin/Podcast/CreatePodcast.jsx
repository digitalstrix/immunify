import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@material-ui/core';

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    ['link', 'image'],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'align': [] }],

    ['clean']
];

const Createpodcast = () => {
    const [value1, setValue1] = useState({
        title:"",
        image:"",
        video:"",
        category:""
    });

    const [value, setValue] = useState({
        richText: '',
        simpleText: '',
        textLength: 0
    });

    const rteChange1 = (content, delta, source, editor) => {
        setValue({
            richText: editor.getHTML(),
            simpleText: editor.getText(),
            textLength: editor.getLength()
        })
    };

    const handleChange=(e)=>{
        if(e.target.name==="image" || e.target.name==="video")
        {
            setValue1({...value1,[e.target.name]:e.target.files[0]});
        }
        else
        {
            setValue1({...value1,[e.target.name]:e.target.value});
        }
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(value1);
        console.log(value);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                    <h1>Create Podcast</h1>
                </div>
                <div>
                    <h3>Title</h3>
                    <TextField id="title" label="Title" sx={{ width: "100%" }} name="title" onChange={handleChange} value={value1.title} variant="outlined" />
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <h3>Upload Thumbnail Image</h3>
                    <input type="file" name="image" onChange={handleChange} id="image" />
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <h3>Upload Video</h3>
                    <input type="file" name="video" onChange={handleChange} id="video" />
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="category1">Category</InputLabel>
                        <Select
                            labelId="category1"
                            id="category"
                            label="Age"
                            name="category" onChange={handleChange} value={value1.category}
                        >
                            <MenuItem value={'category1'}>Category 1</MenuItem>
                            <MenuItem value={'category2'}>Category 2</MenuItem>
                            <MenuItem value={'category3'}>Category 3</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <ReactQuill theme="snow" value={value.richText} placeholder="Write here .." onChange={rteChange1} modules={{ toolbar: toolbarOptions }} />
                </div>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </form>
        </>
    );
}

export default Createpodcast;

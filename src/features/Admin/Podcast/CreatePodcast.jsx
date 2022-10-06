import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { MultiSelect } from "react-multi-select-component";
import MainContext from '../../../context/MainContext';
import Loader from '../../../utils/Loader';
import { useHistory } from 'react-router-dom';

var toolbarOptions = [
    [{ 'color': [] }, { 'background': [] }],
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

const Createpodcast = (props) => {
    const [value1, setValue1] = useState({
        title: "",
        slug: "",
        video: "",
        status: "",
        featuredImage: ""
    });
    const [value, setValue] = useState({
        richText: '',
        simpleText: '',
        textLength: 0
    });
    const [options, setOptions] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [selected, setSelected] = useState([]);
    const context = useContext(MainContext);
    const history = useHistory();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let options1=[];
        const ans=await context.getCategory("POST");
        console.log(ans.data);
        for(let i of ans.data)
        {
            options1.push({
                label:i.name,
                value:i.id
            });
        }
        setOptions(options1);
    };

    const rteChange1 = (content, delta, source, editor) => {
        setValue({
            richText: editor.getHTML(),
            simpleText: editor.getText(),
            textLength: editor.getLength()
        })
    };

    const handleChange = (e) => {
        if (e.target.name === "video") {
            if (e.target.files[0].type.match('video.*')) {
                setValue1({ ...value1, [e.target.name]: e.target.files[0] });
            }
            else {
                setValue1({ ...value1, video: "" });
                window.alert("File must be a video");
            }
        }
        else if (e.target.name === "featuredImage") {
            if (e.target.files[0].type.match('image.*')) {
                setValue1({ ...value1, [e.target.name]: e.target.files[0] });
            }
            else {
                window.alert("File must be an image");
            }
        }
        else {
            console.log('fsdf');
            setValue1({ ...value1, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(value1);
        console.log(value);
        console.log(selected);
        if(selected.length>0)
        {
            if (value1.video.type !== undefined && value1.featuredImage.type !== undefined) {
                setIsLoad(true);
                let str = "";
        
                for (let i of selected) {
                    str += i.value + ",";
                }
        
                console.log(str.slice(0, -1));
        
                let ans = await context.createPodcast({ podcast: value1.video, name: value1.title, UserId: "1", slug: value1.slug, content: value.richText, PodcastCategoryId: str.slice(0, -1), featuredImage: value1.featuredImage, status:value1.status });
                console.log(ans);
                if (ans.status) {
                    props.showAlert(true);
                    history.push(`/edit-podcast/${ans.data.id}`);
                }
                else {
                    props.showAlert(false);
                }
                setIsLoad(false);
            }
        }
        else
        {
            window.alert("Category field is required");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {isLoad ? <Loader /> : null}
                <div style={{ marginBottom: "20px" }}>
                    <h1>Create Podcast</h1>
                </div>

                <div>
                    <h3>Title</h3>
                    <TextField id="title" label="Title" sx={{ width: "100%" }} name="title" onChange={handleChange} value={value1.title} variant="outlined" required />
                </div>
                <div>
                    <h3>URL Slug</h3>
                    <TextField id="slug" label="Slug" sx={{ width: "100%" }} name="slug" onChange={handleChange} value={value1.slug} variant="outlined" />
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <h3>Select Categories</h3>
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <h3>Write Description</h3>
                    <ReactQuill theme="snow" value={value.richText} placeholder="Write here .." onChange={rteChange1} modules={{ toolbar: toolbarOptions }} required />
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <h3>Select Status</h3>
                    <FormControl fullWidth>
                        <InputLabel id="status1">Status</InputLabel>
                        <Select
                            labelId="status1"
                            id="status"
                            label="Status"
                            name="status" onChange={handleChange} value={value1.status} required
                        >
                            <MenuItem value={'DRAFT'}>Draft</MenuItem>
                            <MenuItem value={'PUBLISHED'}>Published</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <h3>Upload File</h3>
                    <input type="file" name="video" onChange={handleChange} id="video" required />
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <h3>Upload Featured Image</h3>
                    <input type="file" name="featuredImage" onChange={handleChange} id="featuredImage" required />
                </div>
                <div className="text-right">
                    <Button disabled={isLoad} type="submit" variant="contained">Submit</Button>
                </div>
            </form>
        </>
    );
}

export default Createpodcast;

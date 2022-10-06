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
import { useHistory } from 'react-router';

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

const Createarticle = (props) => {
    const [value1, setValue1] = useState({
        title: "",
        image: "",
        status: "",
        slug: "",
        file: "",
    })
    const [value, setValue] = useState({
        richText: '',
        simpleText: '',
        textLength: 0
    });
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [flag, setFlag] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const context = useContext(MainContext);
    const history = useHistory();

    useEffect(() => {
        getData();
    }, [flag]);

    const getData = async () => {
        let options1 = [];
        const ans = await context.getCategory("POST");
        console.log(ans.data);
        for (let i of ans.data) {
            options1.push({
                label: i.name,
                value: i.id
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
        if (e.target.name === "image" || e.target.name === "file") {
            if (e.target.files[0].type.match('image.*')) {
                setValue1({ ...value1, [e.target.name]: e.target.files[0] });
            }
            else {
                window.alert("File must be an image");
            }
        }
        else {
            setValue1({ ...value1, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(value1);
        console.log(value);
        // console.log(selected);
        if (value1.image.type !== undefined) {
            if (selected.length > 0) {
                setIsLoad(true);
                let str = "";
                for (let i of selected) {
                    str += i.value + ",";
                }
                // console.log(str.slice(0,-1));

                let ans = await context.createPost({ title: value1.title, type: "test Type", slug: value1.slug, categories: str.slice(0, -1), content: value.richText, file_link: value1.image, status: value1.status, created_by_user: "1" });
                console.log(ans);
                setIsLoad(false);

                if (ans.status) {
                    props.showAlert(true);
                    setFlag(!flag);
                    history.push(`/edit-article/${ans.data.id}`);
                }
                else {
                    props.showAlert(false);
                }
            }
            else {
                window.alert("Categories are required");
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {isLoad ? <Loader /> : null}

                <div style={{ marginBottom: "20px" }}>
                    <h1>Create Article</h1>
                </div>
                <div>
                    <h3>Title</h3>
                    <TextField id="title" label="Title" sx={{ width: "100%" }} name="title" onChange={handleChange} value={value1.title} variant="outlined" required />
                </div>
                <div>
                    <h3>URL Slug</h3>
                    <TextField id="slug" label="URL Slug" sx={{ width: "100%" }} name="slug" onChange={handleChange} value={value1.slug} variant="outlined" />
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
                    <h3>Content</h3>
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
                {/* <div style={{ marginBottom: "12px" }}>
                    <h3>Upload File</h3>
                    <input type="file" name="file" onChange={handleChange} id="file" />
                </div> */}
                <div style={{ marginBottom: "12px" }}>
                    <h3>Upload Featured Image</h3>
                    <input type="file" name="image" onChange={handleChange} id="image" required />
                </div>
                <div className="text-right">
                    <Button disabled={isLoad} type="submit" variant="contained">Submit</Button>
                </div>
            </form>
        </>
    )
}

export default Createarticle;

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
import { useParams } from 'react-router-dom';
import Loader from '../../../utils/Loader';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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

const Editarticle = (props) => {
    const [value1, setValue1] = useState({
        title: "",
        image: "",
        status: "",
        slug: "",
        file: ""
    })
    const [value, setValue] = useState({
        richText: '',
        simpleText: '',
        textLength: 0
    });
    const [updateFlag, setUpdateFlag] = useState(false);
    const [options, setOptions] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [selected, setSelected] = useState([]);
    const context = useContext(MainContext);
    const { id } = useParams();
    const [fImage, setFImage] = useState("");

    useEffect(() => {
        setIsLoad(true);
        getData();
        setIsLoad(false);
    }, [updateFlag]);

    const getData = async () => {
        let options1 = [];
        const ans1 = await context.getCategory("POST");
        console.log(ans1.data);
        for (let i of ans1.data) {
            options1.push({
                label: i.name,
                value: i.id
            });
        }
        setOptions(options1);

        const ans = await context.getPost(id);
        console.log(ans.data[0]);

        setFImage(ans.data[0].fileName);
        setValue1({
            title: ans.data[0].title,
            image: ans.data[0].fileName,
            status: ans.data[0].status.toUpperCase(),
            slug: ans.data[0].slug,
            // file: ans.data[0].post
        });

        setValue({
            richText: ans.data[0].content,
            simpleText: ans.data[0].content,
            textLength: ans.data[0].content.length,
        });

        setSelected(selected.concat({
            label: ans.data[0].PostCategory.name,
            value: ans.data[0].PostCategory.id
        }))
    };

    const dltImg = () => {
        setValue1({ ...value1, image: "" });
        document.getElementById('dltImg').style.display = 'none';
    }

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
                document.getElementById('dltImg').style.display = 'block';
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
        console.log(selected);
        // if(value1.image!=="")
        // {
        if (value1.image.type !== undefined || value1.image.includes('uploads')) {
            if (selected.length > 0) {
                setIsLoad(true);
                let str = "";

                for (let i of selected) {
                    str += i.value + ",";
                }
                console.log(str.slice(0, -1));

                let ans = await context.updatePost({ id, title: value1.title, type: "test Type", slug: value1.slug, categories: str.slice(0, -1), content: value.richText, file_link: value1.image, status: value1.status, created_by_user: "1" });

                console.log(ans);
                if (ans.status) {
                    props.showAlert(true);
                }
                else {
                    props.showAlert(false);
                }
                setIsLoad(false);
                setUpdateFlag(!updateFlag);
                window.location.reload();
            }
            else {
                window.alert("Category field is required");
            }
        }
        // }
        // else {
        //     window.alert("Image field is mandatory");
        // }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {isLoad ? <Loader /> : null}
                <div style={{ marginBottom: "20px" }}>
                    <h1>Edit Article</h1>
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
                <div id="dltImg" style={{ marginBottom: "12px" }}>
                    <h3>Upload Image</h3>
                    <div className="row">
                        <img style={{ width: "250px", height: "250px" }} src={`https://immunify-backend.herokuapp.com/${fImage}`} alt="" />
                        <div onClick={dltImg}>
                            <DeleteForeverIcon />
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <h3>Upload File</h3>
                    <input type="file" name="image" onChange={handleChange} id="image" required={value1.image === ""} />
                </div>

                {/* <div style={{ marginBottom: "12px" }}>
                    <h3>Upload Featured Image</h3>
                    <input type="file" name="image" onChange={handleChange} id="image" />
                </div> */}

                <div className="text-right">
                    <Button disabled={isLoad} type="submit" variant="contained">Submit</Button>
                </div>
            </form>
        </>
    )
}

export default Editarticle;

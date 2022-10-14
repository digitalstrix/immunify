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
import ReactPlayer from 'react-player'

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

const Editpodcast = (props) => {
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
    const [updateFlag, setUpdateFlag] = useState(false);
    const [options, setOptions] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [fImage, setFImage] = useState("");
    const [fFile, setFFile] = useState("");
    const [selected, setSelected] = useState([]);
    const context = useContext(MainContext);
    const { id } = useParams();

    useEffect(() => {
        setIsLoad(true);
        getData();
        setIsLoad(false);
    }, [updateFlag]);

    const getData = async () => {
        let options1 = [];
        const ans1 = await context.getCategory("PODCAST");
        console.log(ans1.data);

        for (let i of ans1.data) {
            options1.push({
                label: i.name,
                value: i.id
            });
        }

        setOptions(options1);

        const ans = await context.getPodcast(id);
        console.log(ans.data[0]);
        setFImage(ans.data[0].featuredImage);
        setFFile(ans.data[0].fileName);
        setValue1({
            title: ans.data[0].name,
            slug: ans.data[0].slug,
            video: ans.data[0].fileName,
            status: ans.data[0].status.toUpperCase(),
            featuredImage: ans.data[0].featuredImage
        });

        setValue({
            richText: ans.data[0].content,
            simpleText: ans.data[0].content,
            textLength: ans.data[0].content.length,
        });

        let temp = options1[options1.findIndex(x => x.value === ans.data[0].PodcastCategoryId)];
        if (temp) {
            setSelected([{
                label: temp.label,
                value: temp.value
            }]);
        }
        else {
            setSelected([]);
        }
    };

    const dltImg = () => {
        setValue1({ ...value1, featuredImage: "" });
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
        if (e.target.name === "video") {
            if (e.target.files[0].type.match('video.*')) {
                setValue1({ ...value1, [e.target.name]: e.target.files[0] });
            }
            else {
                window.alert("File must be a video");
            }
        }
        else if (e.target.name === "featuredImage") {
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
        if (selected.length > 0) {
            console.log(value1.video);
            console.log(value1.featuredImage);
            // value1.video.includes("fakepath")
            if ((value1.video.type !== undefined) && (value1.featuredImage.type !== undefined)) {
                console.log('if');
                setIsLoad(true);
                let str = "";

                for (let i of selected) {
                    str += i.value + ",";
                }

                console.log(str.slice(0, -1));

                let ans = await context.updatePodcast({ id, podcast: value1.video, status: value1.status, name: value1.title, UserId: "1", slug: value1.slug, content: value.richText, PodcastCategoryId: str, featuredImage: value1.featuredImage });
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
            else
            {
                console.log('else');
                if(value1.video.type === undefined && value1.featuredImage.type !== undefined)
                {
                    console.log('else if1');
                    if(!value1.video.includes("fakepath"))
                    {
                        setIsLoad(true);
                        let str = "";
        
                        for (let i of selected) {
                            str += i.value + ",";
                        }
        
                        console.log(str.slice(0, -1));
        
                        let ans = await context.updatePodcast({ id, podcast: value1.video, status: value1.status, name: value1.title, UserId: "1", slug: value1.slug, content: value.richText, PodcastCategoryId: str, featuredImage: value1.featuredImage });
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
                }
                else if(value1.featuredImage.type === undefined && value1.video.type !== undefined)
                {
                    console.log('else if2');
                    if(!value1.featuredImage.includes("fakepath"))
                    {
                        setIsLoad(true);
                        let str = "";
        
                        for (let i of selected) {
                            str += i.value + ",";
                        }
        
                        console.log(str.slice(0, -1));
        
                        let ans = await context.updatePodcast({ id, podcast: value1.video, status: value1.status, name: value1.title, UserId: "1", slug: value1.slug, content: value.richText, PodcastCategoryId: str, featuredImage: value1.featuredImage });
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
                }
                else if(value1.featuredImage.type === undefined && value1.video.type === undefined)
                {
                    console.log('else if3');
                    if(!value1.featuredImage.includes("fakepath") && !value1.video.includes("fakepath"))
                    {
                        setIsLoad(true);
                        let str = "";
        
                        for (let i of selected) {
                            str += i.value + ",";
                        }
        
                        console.log(str.slice(0, -1));
        
                        let ans = await context.updatePodcast({ id, podcast: value1.video, status: value1.status, name: value1.title, UserId: "1", slug: value1.slug, content: value.richText, PodcastCategoryId: str, featuredImage: value1.featuredImage });
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
                }
            }
        }
        else {
            window.alert("Category field is required");
        }
    };

    return (
        <>
            {isLoad ? <Loader /> : null}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                    <h1>Edit Podcast</h1>
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
                    {/* <video width="400" controls>
                        <source src={`https://immunify-backend.herokuapp.com/${value1.video}`} type="video/mp4" />
                    </video> */}
                    <ReactPlayer url={`https://immunify-backend.herokuapp.com/${fFile}`} controls={true} />
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <h3>Upload File</h3>
                    <input type="file" name="video" onChange={handleChange} id="video" />
                </div>
                <div id="dltImg" style={{ marginBottom: "12px" }}>
                    <h3>Featured Image</h3>
                    <div className="row">
                        <img style={{ width: "250px", height: "250px" }} src={`https://immunify-backend.herokuapp.com/${fImage}`} alt="" />
                        <div onClick={dltImg}>
                            <DeleteForeverIcon />
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <h3>Upload Featured Image</h3>
                    <input type="file" name="featuredImage" onChange={handleChange} id="featuredImage" required={value1.featuredImage === ""} />
                </div>
                <div className="text-right">
                    <Button disabled={isLoad} type="submit" variant="contained">Submit</Button>
                </div>
            </form>
        </>
    );
}

export default Editpodcast;

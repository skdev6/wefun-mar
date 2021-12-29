import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import SignatureCanvas from 'react-signature-canvas';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFTEMPLATE = "/PDFTemplate.pdf";
const MyInput = (props) => {
  const [cover, setCover] = useState(true);
  const inputRef = useRef();

  useEffect(()=>{
      console.log(inputRef.current);
      if(typeof inputRef.current != 'undefined')
        inputRef.current.focus();
  },[cover]);
  return(
    <div style={{diplay:'flex', flexDirection:'column', height:'50px', width:props.width,
    position:'relative', left:props.left, top:props.top, zIndex:'99'}}>
      <div style={{height:'14px'}}>
        {cover && 
          <div onClick={()=>{setCover(false); }} style={{display:'flex', justifyContent:'center',marginTop:'8px', fontSize:'8px', color:'white',backgroundColor:'rgb(24 99 124)', width:'100%', alignItem:'center'}}><div>Click</div></div>
        }
        {!cover && 
        <input ref={inputRef} type="text" value={props.value} onChange={props.onChange} 
        style={{width:'100%', height:'100%', backgroundColor:'rgb(109 209 243)', border:'0px', fontSize:props.fontsize}}/>
        }
      </div>
    </div>
  )
}

const dt = new Date();
const [month, day, year] = [dt.getMonth(), dt.getDate(), dt.getFullYear()];

export default ()=> {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(day+"/"+(month+1)%12+"/"+year);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  
  const [cover, setCover] = useState(true);
  const canvasRef = useRef({});


  function onDocumentLoadSuccess(){
    // document.getElementById('loading').innerHTML='';
  }
  
  async function confirm(){
    if(typeof document !== 'undefined'){
      if(typeof canvasRef.current === 'undefined' || 
      amount ==='' || date === '' || name === '' || title === '' || email === '')
      {
        // document.getElementById('loading').innerHTML='<h6>Please fill all fields!</h6>'
        return false;
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          "Amount": amount,
          "Date": date,
          "Name": name,
          "Title": title,
          'Email': email,
          "Sign":canvasRef.current.toDataURL(),
        }),
      };
      // console.log(amount)
      // console.log(date);
      // console.log(name);
      // console.log(title);
      // console.log(email);
      // console.log(canvasRef.current.toDataURL());

      fetch('http://localhost:3001/pdfmake', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("from server:");
        console.log(data);
        document.getElementById('loading').innerHTML=`
        <div>
        <h5>Sent success!</h5>
        <h6><a href="./PDF/${data.data}">Click here to see your PDF!</a></h6>
        `
      })
      .catch((e) =>{
        console.log("Error:"+e);
      })
    }
  }

  return (
    <>
      {/* <div style={{backgroundColor:'#b1adad', height:'40px', display:'flex', justifyContent:'center', alignItems:'center', position:'fixed', width:'100%', zIndex:'999'}}>
        <div id="loading" style={{position:'absolute', left:'0', top:'0', zIndex:'999'}} >
          <h5>Loading...</h5>
          <h6>Please wait..</h6>
        </div>
        <div style={{width:'120px', borderRadius:'34px',height:'80%', backgroundColor:'rgb(42 76 43)', cursor:'pointer', display:'flex', justifyContent:'center'}}
        onClick={()=>{confirm()}}
        >
          <h5>Confirm</h5>
        </div>
      </div> */}
      <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
        {/* <div style={{width:"30%"}}>
          <span style={{width:"100%"}}></span>
        </div> */}
        <div>
          <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
              <Document
                file={PDFTEMPLATE}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={1} scale="1.3"/>
              </Document>
            </div>
            <div style={{display:'flex', justifyContent:'center', marginTop:"20px"}}>
              <Document
                file={PDFTEMPLATE}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={2} scale="1.3" />
              </Document>
            </div>
            <div style={{display:'flex', justifyContent:'center', marginTop:"20px"}}>
              <Document
                file={PDFTEMPLATE}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={3} scale="1.3" />
              </Document>
            </div>
            <div style={{display:'flex', justifyContent:'center', marginTop:"20px"}}>
              <Document
                file={PDFTEMPLATE}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={4} scale="1.3" />
              </Document>
            </div>
            <div style={{display:'flex', justifyContent:'center', marginTop:"20px"}}>
              <Document
                file={PDFTEMPLATE}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={5} scale="1.3" />
              </Document>
            </div>
            <div style={{display:'flex', justifyContent:'center', marginTop:"20px"}}>
              <Document
                file={PDFTEMPLATE}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={6} scale="1.3" />
              </Document>
            </div>
          </div>
        </div>
        {/* <div style={{width:"30%", display:'flex', flexDirection:'column'}}>
          <MyInput width='65px' left='-432px' top='152px' value={amount} 
            onChange={(e) => setAmount(e.target.value)} fontsize='12px'/>
          <MyInput width='55px' left='-163px' top='102px' value={date} fontsize='10px'/>
          <MyInput width='130px' left='-233px' top='3757px' value={name} 
            onChange={(e) => setName(e.target.value)} fontsize='12px'/>
          <MyInput width='130px' left='-233px' top='3733px' value={title} 
            onChange={(e) => setTitle(e.target.value)} fontsize='12px'/>
          <MyInput width='130px' left='-233px' top='3709px' value={email} 
            onChange={(e) => setEmail(e.target.value)} fontsize='12px'/>
          <div style={{display:'flex', flexDirection:'row', alignItem:'end', width:'150px', height:'55px',
            position:'relative', left:'-250px', top:'3545px', zIndex:'999', border:'2px', color:'black'}}>
              {cover &&
                <div onClick={()=>{setCover(false); }} style={{display:'flex', justifyContent:'center', fontSize:'14px', color:'white',backgroundColor:'rgb(24 99 124)', width:'100%', alignItems:'center'}}><div>Click</div></div>
              }
              {!cover &&
                <>
                <div style={{display:'flex', justifyContent:'center', backgroundColor:'rgb(109 209 243)',
                  width:'150px'}}>
                  <SignatureCanvas ref={canvasRef} penColor='black'
                    canvasProps={{width: 150, height: 55}}/>
                </div>
                <div style={{cursor:'pointer', margin:'2px', display:'flex', alignItems:'end'}} onClick={()=>{canvasRef.current.clear()}}>
                  <div style={{fontsize:'12px'}}>Clear</div>
                </div>
                </>
              }
          </div>             
        </div> */}
      </div>
    </>
  )
}
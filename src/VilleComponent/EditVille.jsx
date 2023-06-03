import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate,useParams } from "react-router-dom";
import {
    MDBInput, MDBInputGroup, MDBBtn, MDBCheckbox, MDBValidation, MDBValidationItem, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar,

} from 'mdb-react-ui-kit';

import Navbar from "../Navbar";





const EditVille = () => {
    const [nom, setNom] = useState("");
    const [ville, setVille] = useState([]);


    const [reference, setReference] = useState("");
    const [budget, setBudget] = useState([]);
    const [description, setDescription] = useState([]);
    const [technicalDate, setTechnicalDate] = useState(null);
    const [financialDate, setFinancialDate] = useState(null);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const [kam, setKam] = useState([]);
    const [cfo, setCfo] = useState([]);
    const [presale, setPresale] = useState([]);
    const [aftersale, setAftersale] = useState([]);
    const [type, setType] = useState([]);
    const [subType, setSubType] = useState([]);
    const [warranty, setWarranty] = useState([]);
    const [warrantyTime, setWarrantyTime] = useState([]);
    const [typeId, setTypeId] = useState("");
    const [types, setTypes] = useState([]);
    const [subTypeId, setSubTypeId] = useState("");
    const [subTypes, setSubTypes] = useState([]);
    const [kamId, setKamId] = useState("");
    const [kams, setKams] = useState([]);
    
    const [rfq, setRfq] = useState([]);
    const [technicalSubmissionEndDate, setTechnicalSubmissionEndDate] = useState(new Date());
    const [financialSubmissionEndDate, setFinancialSubmissionEndDate] = useState(new Date());



  
    const {id}=useParams()
  
  useEffect(()=>{
    loadVille()
  },[]
  );
  
      const loadVille=async ()=>{
         
         const result= await axios.get(`/api/villes/findById/${id}`)
         setVille(result.data)
         setNom(result.data.nom)
      
       
         console.log(result.data)
  
      };




    const handleSubmit = (event) => {
        event.preventDefault();
        
      
          // Access the IDs
          
        
      
      
       axios.put("/api/villes/update/", {
            id:id,
            nom: nom,
          

        }).then((response) => {

            navigate("/VilleListe");
        });
    };



    return (

        <div >
            <Navbar />
            <div>
                
            </div>
            <div style={{ marginTop: 20, marginLeft: 70, marginRight: 70 }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Edit Ville</h1>
                <MDBValidation onSubmit={handleSubmit} className='row g-3' isValidated>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                                value={nom}
                                name='nom'
                                onChange={(event) => setNom(event.target.value)}
                                id='nom'
                                required
                                label='Nom'
                            />
                        </MDBValidationItem>
                    </div>
  

                    <div className='col-12'>
                        <MDBBtn type='submit'>Edit</MDBBtn>
                    </div>
                </MDBValidation>
            </div>

        </div>
    );
};

export default EditVille;

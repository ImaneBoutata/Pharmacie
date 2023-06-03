import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {
    MDBInput, MDBInputGroup, MDBBtn, MDBRadio, MDBCheckbox, MDBValidation, MDBValidationItem, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar,

} from 'mdb-react-ui-kit';
import authHeader from "../serviceSpringSecurity/auth-header";
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import Navbar from "../Navbar";



const AddPharmacie = () => {
    const [nom, setNom] = useState([]);
    const [adresse, setAdresse] = useState([]);
    const [latitude, setLatitude] = useState([]);
    const [longitude, setLongitude] = useState([]);
    const [image, setImage] = useState([]);

    const [heureOuverture, setHeureOuverture] = useState([]);
    const [heureFermeture, setHeureFermeture] = useState([]);
    const [heureOuvertureFormatted, setHeureOuvertureFormatted] = useState([]);
    const [heureFermetureFormatted, setHeureFermetureFormatted] = useState([]);


    

    const [zones, setZones] = useState([]);
    const [zoneId, setZoneId] = useState([]);



    const navigate = useNavigate();


    useEffect(() => {
        // fetchUserList();
    }, []);

    useEffect(() => {

        axios.get("/api/zones/", { headers: authHeader() }).then((response) => {
            setZones(response.data);
        });
    }, []);

    const handleZoneChange = (selectedOption) => {
        const ZoneId = selectedOption.value;
        setZoneId(ZoneId);
    };


    const handleSubmit2 = (event) => {
        event.preventDefault();
        const heureOuvertureFormatted = new Date(`1970-01-01T${heureOuverture}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const heureFermetureFormatted = new Date(`1970-01-01T${heureFermeture}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const newPharmacie = {
            nom: nom,
            adresse: adresse,
            latitude: latitude,
            longitude: longitude,
            image: image,
            heureOuverture: heureOuvertureFormatted,
            heureFermeture: heureFermetureFormatted,

            zone: {
                id: zoneId
            },


        };

        axios
            .post('/api/pharmacies/save', newPharmacie, { headers: authHeader() })
            .then((response) => {
                navigate('/PharmacieListe');
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <div >
            <Navbar />
            <div>

            </div>
            <div style={{ marginTop: 20, marginLeft: 70, marginRight: 70 }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Add Pharmacie</h1>
                <MDBValidation onSubmit={handleSubmit2} className='row g-3' isValidated>
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
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                                value={adresse}
                                name='adresse'
                                onChange={(event) => setAdresse(event.target.value)}
                                id='adresse'
                                required
                                label='Adresse'
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                                value={latitude}
                                name='latitude'
                                onChange={(event) => setLatitude(event.target.value)}
                                id='latitude'
                                required
                                label='Latitude'
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                                value={longitude}
                                name='longitude'
                                onChange={(event) => setLongitude(event.target.value)}
                                id='longitude'
                                required
                                label='Longitude'
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                                value={image}
                                name='image'
                                onChange={(event) => setImage(event.target.value)}
                                id='image'
                                required
                                label='Image'
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                            type="time"
                                value={heureOuverture}
                                name='heureOuverture'
                                onChange={(event) => setHeureOuverture(event.target.value)}
                                id='heureOuverture'
                                
                                label='Heure d Ouverture'
                            />
                        </MDBValidationItem>
                    </div>

                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                            type="time"
                                value={heureFermeture}
                                name='heureFermeture'
                                onChange={(event) => setHeureFermeture(event.target.value)}
                                id='heureFermeture'
                                
                                label='Heure d Fermeture'
                            />
                        </MDBValidationItem>
                    </div>
                    

                    {/*<timepicker onchange={onchange} value={heureFermeture} /> */}
                    <div className="col-md-6">
                        <MDBValidationItem feedback="" invalid>
                            <label htmlFor="select3" className="form-label">
                                Zone
                            </label>
                            <Select
                                id="select3"
                                required
                                className="form-control"
                                onChange={handleZoneChange}
                                options={zones.map((z) => ({ value: z.id, label: z.nom }))}
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-12'>
                        <MDBBtn type='submit'>Save</MDBBtn>
                    </div>
                </MDBValidation>
            </div>

        </div>
    );
};

export default AddPharmacie;

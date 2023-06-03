import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
    MDBInput, MDBInputGroup, MDBBtn, MDBCheckbox, MDBValidation, MDBValidationItem, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar,

} from 'mdb-react-ui-kit';
import authHeader from "../serviceSpringSecurity/auth-header";
import Select from 'react-select';
import Navbar from "../Navbar";



const EditPharmacie = () => {
    const [nom, setNom] = useState([]);
    const [adresse, setAdresse] = useState([]);
    const [latitude, setLatitude] = useState([]);
    const [longitude, setLongitude] = useState([]);
    const [image, setImage] = useState([]);

    const [heureOuverture, setHeureOuverture] = useState([]);
    const [heureFermeture, setHeureFermeture] = useState([]);

    const [heureOuvertureFormatted, setHeureOuvertureFormatted] = useState([]);
    const [heureFermetureFormatted, setHeureFermetureFormatted] = useState([]);

    const [zone, setZone] = useState({});

    const [zones, setZones] = useState([]);
    const [zoneId, setZoneId] = useState("");
    const [pharmacies, setPharmacies] = useState([]);
    const [pharmacie, setPharmacie] = useState([]);




    const { id } = useParams()

    useEffect(() => {
        loadPharmacie()
        zoneList()
       // handleVilleChange()
    }, []
    );
 
    const handleZoneChange = (selectedOption) => {
      //  setVilleIdNew(selectedOption.value);
       // setVilleId(selectedOption.value);
       const ZoneId = selectedOption.value;
       console.log("hahiiiaaa zoneid", ZoneId)
       setZoneId(ZoneId);
       zoneById()


       console.log("imaaane zone",zone)
       console.log("imaaane zoneID ",zoneId)

    };


    const loadPharmacie = async () => {

        const result = await axios.get(`/api/pharmacies/findById/${id}`)
        setPharmacie(result.data)
        setNom(result.data.nom)
        setAdresse(result.data.adresse)
        setLatitude(result.data.latitude)
        setLongitude(result.data.longitude)
        setImage(result.data.image)
        setHeureOuverture(result.data.heureOuverture)
        setHeureFermeture(result.data.heureFermeture)
        setZone(result.data.zone)
        console.log(result.data)

    };
    const zoneList = () => {
        axios
            .get('/api/zones/', { headers: authHeader() })
            .then((response) => {
                setZones(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const zoneById = () => {
        axios
            .get(`/api/zones/findById/${zoneId}`, { headers: authHeader() })
            .then((response) => {
                setZone(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

  


    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(ville);
      //  console.log(villeId);
      const heureOuvertureFormatted = new Date(`1970-01-01T${heureOuverture}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const heureFermetureFormatted = new Date(`1970-01-01T${heureFermeture}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      

        axios.put("/api/pharmacies/update/", {
            
            id: id,
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
           


        }).then((response) => {

            Navigate("/PharmacieListe");
        });
    };



    return (

        <div >
            <Navbar />
            <div>

            </div>
            <div style={{ marginTop: 20, marginLeft: 70, marginRight: 70 }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Edit Pharmacie</h1>
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
                                className="form-control"
                                onChange={handleZoneChange}
                                value={{ value: zoneId, label: zone && zone.nom }}
                                options={zones.map((z) => ({ value: z.id, label: z.nom }))}
                            />
                        </MDBValidationItem>
                    </div>

                  {/* <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <label htmlFor='select3' className='form-label'>
                                Ville
                            </label>
                            <Select
                                id='select3'
                                required
                                className='form-control'
                                onChange={handleVilleChange}
                                value={{ value: villeId, label: ville && ville.nom }}
                               // value={ville && { value: ville, label: ville.nom }}
                              //  value={{ value: villeId, label: ville && ville.nom }}
                              //value={{villeId}}

                                options={villes.map((v) => ({ value: v, label: v.nom }))}
                            />
                        </MDBValidationItem>
    </div>*/}


                    <div className='col-12'>
                        <MDBBtn type='submit'>Edit</MDBBtn>
                    </div>
                </MDBValidation>
            </div>

        </div>
    );
};

export default EditPharmacie;

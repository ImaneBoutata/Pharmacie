import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
    MDBInput, MDBInputGroup, MDBBtn, MDBCheckbox, MDBValidation, MDBValidationItem, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar,

} from 'mdb-react-ui-kit';
import authHeader from "../serviceSpringSecurity/auth-header";
import Select from 'react-select';
import Navbar from "../Navbar";




const EditZone = () => {
    const [nom, setNom] = useState("");
    const [villeId, setVilleId] = useState("");

    const [ville, setVille] = useState({});


    const [zone, setZone] = useState([]);
    const [villes, setVilles] = useState([]);



    const { id } = useParams()

    useEffect(() => {
        loadZone()
        villeList()
       // handleVilleChange()
    }, []
    );
    // const handleVilleChange = (selectedOption) => {
    // const VilleId = selectedOption.value;
    //setVilleId(VilleId);
    //};
    const handleVilleChange = (selectedOption) => {
      //  setVilleIdNew(selectedOption.value);
       // setVilleId(selectedOption.value);
       const VilleId = selectedOption.value;
       //setVilleId(VilleId);
       setVille(VilleId);
       setVilleId(VilleId.id);

       console.log("imaaane",ville);
       console.log("imaaane",villeId);

    };


    const loadZone = async () => {

        const result = await axios.get(`/api/zones/findById/${id}`)
        setZone(result.data)
        setNom(result.data.nom)
        setVille(result.data.ville)
        console.log(result.data)

    };
    const villeList = () => {
        axios
            .get('/api/villes/', { headers: authHeader() })
            .then((response) => {
                setVilles(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

  


    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(ville);
      //  console.log(villeId);


        axios.put("/api/zones/update/", {
            
            id: id,
            nom: nom,
            ville: {
                id: villeId
            },


        }).then((response) => {

            Navigate("/ZoneListe");
        });
    };



    return (
        <div >
            <Navbar />

            <div>

            </div>
            <div style={{ marginTop: 20, marginLeft: 70, marginRight: 70 }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Edit Zone</h1>
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
                    {/* <div className="col-md-6">
              <MDBValidationItem feedback="" invalid>
                <label htmlFor="select3" className="form-label">
                  Ville
                </label>
                <Select
                  id="select3"
                  required
                  className="form-control"
                  onChange={handleVilleChange}
                  options={villes.map((v) => ({ value: v.id, label: v.nom }))}
                />
              </MDBValidationItem>
    </div>*/}

                    <div className='col-md-6'>
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
                    </div>


                    <div className='col-12'>
                        <MDBBtn type='submit'>Edit</MDBBtn>
                    </div>
                </MDBValidation>
            </div>

        </div>
    );
};

export default EditZone;

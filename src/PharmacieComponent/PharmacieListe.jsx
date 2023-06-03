import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar, MDBIcon } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { faCircle, faCircleInfo, faInfo, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from "../Navbar";
import { MDBValidationItem, MDBSelect } from 'mdb-react-ui-kit';

import Select from 'react-select';



import axios from "axios";
import { Link } from 'react-router-dom';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import authHeader from '../serviceSpringSecurity/auth-header';


export default function PharmacieListe() {

  const [searchQuery, setSearchQuery] = useState('');/////
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);/////

  const [pharmacies, setPharmacies] = useState([]);
  const [zones, setZones] = useState([]);
  const [villes, setVilles] = useState([]);
  const [zone, setZone] = useState({});
  const [ville, setVille] = useState({});
  const [villeId, setVilleId] = useState('');
  const [zoneId, setZoneId] = useState('');

  const [nomVille, setNomVille] = useState([]);
  const [nom, setNom] = useState('');/////





  useEffect(() => {
    pharmacieList();
  }, []);


  const pharmacieList = () => {
    axios
      .get('/api/pharmacies/', { headers: authHeader() })
      .then((response) => {
        setPharmacies(response.data);
        setFilteredPharmacies(response.data);////////////
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // combo de zone
  useEffect(() => {

    axios.get("/api/zones/", { headers: authHeader() }).then((response) => {
      setZones(response.data);
    });
  }, []);
  // combo de ville
  useEffect(() => {

    axios.get("/api/villes/", { headers: authHeader() }).then((response) => {
      setVilles(response.data);
    });
  }, []);
  // handle zone
  const handleZoneChange = (selectedOption) => {
    const ZoneId = selectedOption.value;
    setZoneId(ZoneId);
  };
  // handle ville 
  const handleVilleChange = (selectedOption) => {
    const VilleId = selectedOption.value;
    setVilleId(VilleId);
  };


  // export excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(pharmacies);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Zones');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'pharmacies.xlsx');
  };

  // Function to handle search query change
  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredPharmacies = pharmacies.filter((pharmacie) => {
      return (
        // ville.username.toLowerCase().includes(query.toLowerCase()) ||
        pharmacie.nom.toLowerCase().includes(query.toLowerCase())
        // user.roles.some((role) => role.name.toLowerCase().includes(query.toLowerCase()))
      );
    });

    setFilteredPharmacies(filteredPharmacies);
  };

  // Calculate the number of items per page
  const itemsPerPage = 20;



  // Define the current page number (initially set to the first page)
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range of the items to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;



  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    if (window.confirm("Etes vous sur de vouloir supprimer cette pharmacie ??")) {
      console.log(id);
      axios.delete(`/api/pharmacies/delete/${id}`, { headers: authHeader() }).then(() => {
        setPharmacies(pharmacies.filter((item) => item.id !== id));
        pharmacieList();
      });
    }
  };




  return (


    <div>
<Navbar />

      <div >
        <div>

        </div>
        <div style={{ marginTop: 15, marginLeft: 70 }} className='d-flex justify-content-begin mb-3'>

          <Link to="/AddPharmacie">
            <MDBBtn color="success" rounded>
              <MDBIcon icon="plus" fas /> Add
            </MDBBtn>

          </Link>


          <MDBBtn color="info" rounded onClick={exportToExcel}>
            <MDBIcon icon="plus" fas /> Export Excel
          </MDBBtn>
        </div>

        <div style={{ marginTop: 5, marginLeft: 70, marginRight: 70 }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Liste de Pharmacies </h1>

          <div className="col-md-6">
            <MDBValidationItem feedback="" invalid>
              <label htmlFor="select3" className="form-label">
                Ville
              </label>
              <Select
                id="select3"
                required
                className="form-control"
                onChange={handleVilleChange}
                options={villes.map((z) => ({ value: z.id, label: z.nom }))}
              />
            </MDBValidationItem>
          </div>
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
          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search'
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>
          <div className='table-responsive'>
            <MDBTable align='middle' >
              <MDBTableHead  >
                <tr className='table-primary'>
                  <th scope='col'>ID</th>
                  <th scope='col'>NOM</th>
                  <th scope='col'>ADRESSE</th>
                  <th scope='col'>LATITUDE</th>
                  <th scope='col'>LONGITUDE</th>
                  <th scope='col'>ZONE</th>
                  <th scope='col'>OUVERTURE</th>
                  <th scope='col'>FERMETURE</th>
                  <th scope='col'>Actions</th>



                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredPharmacies.slice(startIndex, endIndex).map((pharmacie) => (
                  <tr key={pharmacie.id}>
                    <td>
                      <p className='fw-normal mb-1'>{pharmacie.id}</p>

                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pharmacie.nom}</p>

                      </div>
                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pharmacie.adresse}</p>

                      </div>
                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pharmacie.latitude}</p>

                      </div>
                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pharmacie.longitude}</p>

                      </div>
                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pharmacie.zone.nom}</p>

                      </div>
                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pharmacie.heureOuverture}</p>

                      </div>
                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pharmacie.heureFermeture}</p>

                      </div>
                    </td>


                    <td>
                      <Link to={`/EditPharmacie/${pharmacie.id}`} style={{ marginRight: 2 }} className="btn btn-warning btn-rounded btn-sm">
                        <FontAwesomeIcon icon={faPen} />
                      </Link>
                      <MDBBtn color='danger' rounded size='sm' onClick={() => handleDelete(pharmacie.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </MDBBtn>
                     
                      
                      <MDBBtn color='info' rounded size='sm' >
                      <Link  to={`/map/${pharmacie.id}`}>
                        <FontAwesomeIcon icon={faInfo} />
                        </Link>
                      </MDBBtn>
                     
                    </td>
                  </tr>
                ))}

              </MDBTableBody>
            </MDBTable>


          </div>
          <div className="d-flex justify-content-center">


          </div>


        </div>
      </div>



    </div>
  );
}
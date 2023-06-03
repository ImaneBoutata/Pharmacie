import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar, MDBIcon } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { faCircle, faCircleInfo, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navbar from "../Navbar";



import axios from "axios";
import { Link } from 'react-router-dom';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import authHeader from '../serviceSpringSecurity/auth-header';


export default function GardeListe() {

  const [searchQuery, setSearchQuery] = useState('');/////
  const [filteredPharmGarde, setFilteredPharmGarde] = useState([]);/////

  const [zones, setZones] = useState([]);
  const [date_debut, setDate_debut] = useState([]);
  const [date_fin, setDate_fin] = useState([]);
  const [pharmacie, setPharmacie] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacieId, setPharmacieId] = useState('');
  const [gardeId, setGardeId] = useState('');
  const [pharmGarde, setPharmGarde] = useState([]);

  useEffect(() => {
    pharmGardeList();
  }, []);


  const pharmGardeList = () => {
    axios
      .get('/api/pharmgarde/', { headers: authHeader() })
      .then((response) => {
        setPharmGarde(response.data);
        setFilteredPharmGarde(response.data);////////////
      })
      .catch((error) => {
        console.log(error);
      });
  };




  // export excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(pharmGarde);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Gardes');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'Gardes.xlsx');
  };

  // Function to handle search query change
  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const FilteredPharmGarde = pharmGarde.filter((pharmGarde) => {
      return (
        // ville.username.toLowerCase().includes(query.toLowerCase()) ||
        pharmGarde.nom.toLowerCase().includes(query.toLowerCase())
        // user.roles.some((role) => role.name.toLowerCase().includes(query.toLowerCase()))
      );
    });

    setFilteredPharmGarde(filteredPharmGarde);
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
    if (window.confirm("Etes vous sur de vouloir supprimer cette garde ??")) {
      console.log(id);
      axios.delete(`/api/pharmgarde/delete/${id}`, { headers: authHeader() }).then(() => {
        setPharmGarde(pharmGarde.filter((item) => item.id !== id));
        pharmGardeList();
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

          <Link to="/AddGarde">
            <MDBBtn color="success" rounded>
              <MDBIcon icon="plus" fas /> Add
            </MDBBtn>

          </Link>


          <MDBBtn color="info" rounded onClick={exportToExcel}>
            <MDBIcon icon="plus" fas /> Export Excel
          </MDBBtn>
        </div>

        <div style={{ marginTop: 5, marginLeft: 70, marginRight: 70 }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Liste de Gardes</h1>

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
                  <th scope='col'>ID </th>
                  <th scope='col'>ID</th>

                  <th scope='col'>Date Debut</th>
                  <th scope='col'>Date Fin</th>
                  <th scope='col'>Pharmacie</th>
                  <th scope='col'>Type de Garde</th>
                  <th scope='col'>Actions</th>



                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredPharmGarde.slice(startIndex, endIndex).map((pharmg) => (
                  <tr key={pharmg.id}>
                    <td>
                      <p className='fw-normal mb-1'>{pharmg.id.garde_id}</p>

                    </td>

                    <td>
                      <p className='fw-normal mb-1'>{pharmg.id.pharmacie_id}</p>

                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pharmg.date_debut}</p>

                      </div>
                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pharmg.date_fin}</p>

                      </div>
                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pharmg.pharmacie.nom}</p>

                      </div>
                    </td>
                    <td>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>
                          {pharmg.id.garde_id === 1 ? "Jour" : "Nuit"}
                        </p>
                      </div>
                    </td>

                    <td>
                      {/*<Link to={`/EditGarde/${pharmg.id}`} style={{ marginRight: 2 }} className="btn btn-warning btn-rounded btn-sm">
                        <FontAwesomeIcon icon={faPen} />
              </Link>*/}
                      <MDBBtn color='danger' rounded size='sm' onClick={() => handleDelete(pharmg.id)}>
                        <FontAwesomeIcon icon={faTrash} />
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
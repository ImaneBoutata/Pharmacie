import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar, MDBIcon } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { faCircle, faCircleInfo, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from "../Navbar";

import Select from 'react-select';
import {
    MDBInput, MDBInputGroup, MDBRadio, MDBCheckbox, MDBValidation, MDBValidationItem,

} from 'mdb-react-ui-kit';


import axios from "axios";
import { Link } from 'react-router-dom';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import authHeader from '../serviceSpringSecurity/auth-header';
import { Button } from 'antd';


export default function SearchVilleZone() {

  const [searchQuery, setSearchQuery] = useState('');/////
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);/////

  const [pharmacies, setPharmacies] = useState([]);
  const [zones, setZones] = useState([]);
  const [villes, setVilles] = useState([]);
  const [zone, setZone] = useState({});
  const [ville, setVille] = useState({});
  const [villeId, setVilleId] = useState('');
  const [zoneId, setZoneId] = useState('');

  const [villeNom, setVilleNom] = useState([]);
  const [zoneNom, setNomZone] = useState([]);

  const [nom, setNom] = useState('');/////

  useEffect(() => {
    pharmacieList();
  }, [zoneId, villeId]);

  const pharmacieList = () => {
  axios
    .get(`/api/villes/${villeId}/${zoneId}/pharmacies`, { headers: authHeader() })
    .then((response) => {
      const data = response.data;
      if (Array.isArray(data)) {
        setPharmacies(data);
        setFilteredPharmacies(data);
      } else {
        console.log("Invalid data format: Expected an array");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

  useEffect(() => {
    axios.get('/api/zones/', { headers: authHeader() }).then((response) => {
      setZones(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('/api/villes/', { headers: authHeader() }).then((response) => {
      setVilles(response.data);
    });
  }, []);

  const handleZoneChange = (selectedOption) => {
    const zoneId = selectedOption.value;
    setZoneId(zoneId);
  };

  const handleVilleChange = (selectedOption) => {
    const villeId = selectedOption.value;
    setVilleId(villeId);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(pharmacies);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Zones');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'pharmacies.xlsx');
  };

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredPharmacies = pharmacies.filter((pharmacie) => {
      return pharmacie.nom.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredPharmacies(filteredPharmacies);
  };

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClick = () => {
    pharmacieList();
    setZoneId(null); // Clear zoneId
    setVilleId(null); // Clear villeId
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this pharmacy?')) {
      axios
        .delete(`/api/pharmacies/delete/${id}`, { headers: authHeader() })
        .then(() => {
          setPharmacies((prevPharmacies) => prevPharmacies.filter((item) => item.id !== id));
          pharmacieList();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
        <Navbar />
      <div>
        <div style={{ marginTop: 15, marginLeft: 70 }} className="d-flex justify-content-begin mb-3">
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
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Liste de Pharmacies</h1>
          <div className="col-md-6">
            <label htmlFor="select3" className="form-label">
              Ville
            </label>
            <Select
              id="select3"
              required
              className="form-control"
              onChange={handleVilleChange}
              options={villes.map((v) => ({ value: v.nom, label: v.nom }))}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="select3" className="form-label">
              Zone
            </label>
            <Select
              id="select3"
              required
              className="form-control"
              onChange={handleZoneChange}
              options={zones.map((z) => ({ value: z.nom, label: z.nom }))}
            />
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary" onClick={handleClick}>
              Search
            </button>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>
          <div className="table-responsive">
            <MDBTable align="middle">
              <MDBTableHead>
                <tr className="table-primary">
                  <th scope="col">ID</th>
                  <th scope="col">NOM</th>
                  <th scope="col">ADRESSE</th>
                  <th scope="col">LATITUDE</th>
                  <th scope="col">LONGITUDE</th>
                  <th scope="col">ZONE</th>
                  <th scope="col">OUVERTURE</th>
                  <th scope="col">FERMETURE</th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {pharmacies.map((pharmacie) => (
                  <tr key={pharmacie.id}>
                    <td>
                      <p className="fw-normal mb-1">{pharmacie.id}</p>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{pharmacie.nom}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{pharmacie.adresse}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{pharmacie.latitude}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{pharmacie.longitude}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{pharmacie.zone.nom}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{pharmacie.heureOuverture}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{pharmacie.heureFermeture}</p>
                      </div>
                    </td>
                    <td>
                      <Link to={`/EditPharmacie/${pharmacie.id}`} style={{ marginRight: 2 }} className="btn btn-warning btn-rounded btn-sm">
                        <FontAwesomeIcon icon={faPen} />
                      </Link>
                      <MDBBtn color="danger" rounded size="sm" onClick={() => handleDelete(pharmacie.id)}>
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


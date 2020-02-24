import Title from "./Title";
import { FiMap } from 'react-icons/fi';
import { Input } from 'antd';
import useDebounce from "../hooks/useDebounce";
import {useEffect, useState} from "react";
import api from "../api";
import styled from "styled-components";
import { Icon } from 'antd';
import { useDispatch } from "react-redux";
import { setIsOpenAddLocation, setSavedLocations } from "../actions";

export default function AddLocation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const dispatch = useDispatch();

  const searchCity = async (debouncedSearchQuery) => {
    const locations = await api.getLocationsByQuery(debouncedSearchQuery);
    setSearchResults(locations);
    setIsLoading(false);
  }

  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsLoading(true);
      searchCity(debouncedSearchQuery)
    }
  }, [debouncedSearchQuery])

  const addLocation = (id) => {
    dispatch(setIsOpenAddLocation(false));

    let savedLocationIds = JSON.parse(localStorage.getItem('savedLocations')) || [];
    !savedLocationIds.includes(id) ? savedLocationIds.push(id) : "";

    localStorage.setItem('savedLocations', JSON.stringify(savedLocationIds));
    dispatch(setSavedLocations(savedLocationIds));
  }

  return(
    <div className="addLocationBox">
      <Icon type="close" className="closeIcon" onClick={() => dispatch(setIsOpenAddLocation(false))} />
      <div className="title">
        <Title><FiMap/> Yeni Konum Ekle</Title>
        <SubTitle>Bir şehir bulun ve eklemek için üzerine dokunun</SubTitle>
      </div>
      <Input className="cityInput" placeholder="Buraya yazmaya başlayın" onKeyUp={(e) => setSearchQuery(e.target.value)} />

      {isLoading ?
        <div className="loader">
          <div className="one"></div>
          <div className="two"></div>
        </div> :
        searchResults && searchResults.map(searchResult => (
          <SearchResultBox key={searchResult.id} onClick={() => addLocation(searchResult.id)}>
            <SearchResultCountry>{searchResult.country}</SearchResultCountry>
            <SearchResultCity>{searchResult.name}</SearchResultCity>
          </SearchResultBox>
        ))
      }

      <style jsx>{`
        .title {
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      `}
      </style>
    </div>
  )
}

const SearchResultBox = styled.div`
  background-color: ${({ theme }) => theme.boxBgColor};
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 5px;
  width: 100%;
  transition: all 0.2s;
  cursor: pointer;
  margin: 20px 0;
  text-align: center;
  &:hover {
    transform: translateY(-2px);
  }
`;

const SearchResultCountry = styled.h3`
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
    margin: 0;
`;

const SearchResultCity = styled.h2`
    font-size: 1.1rem;
    font-weight: 400;
    text-align: center;
    margin: 0;
    color: ${({ theme }) => theme.text};
`;

const SubTitle = styled.h4`
    font-weight: 300;
    color: #fff;
    margin-top: 15px;
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
`;
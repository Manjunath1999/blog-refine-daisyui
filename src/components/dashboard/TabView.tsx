import React, { useState, useEffect } from "react";
import { TTab, CardData } from "../../interfaces";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import ModalView from "../dashboard/ModelView";
import styled, { keyframes } from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Typography } from '@material-ui/core';


type TTabViewProps = {
  tabs: TTab[];
};

const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const ShimmeringDiv = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: ${shimmerAnimation} 1s linear infinite;
`;

const revenueData: CardData[] = [
  {
    id: 1,
    label: "Online Store Session",
    value: 255581,
    rate: 9
  },
  {
    id: 2,
    label: "Net Return Value",
    value: 1507,
    rate: 7
  },
  {
    id: 3,
    label: "Total Orders",
    value: 10511,
    rate: 5
  },
  {
    id: 4,
    label: "Conversion Rate",
    value: 25,
    rate: 8
  },
  {
    id: 5,
    label: "Gross Sales",
    value: 258581,
    rate: 6
  },
  {
    id: 6,
    label: "Store search Conversion",
    value: 15,
    rate: 8
  },
  {
    id: 7,
    label: "Return",
    value: 5558,
    rate: 8
  },
]




export const TabView = ({ tabs }: TTabViewProps) => {
  const [showGraph, setShowGraph] = useState(false);
  const [initalCardData, setInitialCardData] = useState([{
    id: 1,
    label: "Online Store Session",
    value: 255581,
    rate: 9
  },
  {
    id: 2,
    label: "Net Return Value",
    value: 1507,
    rate: 7
  },
  {
    id: 3,
    label: "Total Orders",
    value: 10511,
    rate: 5
  },
  {
    id: 4,
    label: "Conversion Rate",
    value: 25,
    rate: 8
  }]);
  const [selectedCardData, setSelectedCardData] = useState({
    id: 1,
    label: "Online Store Session",
    value: 255581,
    rate: 9
  });
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [showShimmer, setShowShimmer] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateRangeChange = (newDateRange: any) => {
    setDateRange(newDateRange);
  };

  useEffect(() => {
    setShowShimmer(true);
    const shimmerTimeout = setTimeout(() => {
      setShowShimmer(false);
    }, 2000);

    return () => {
      clearTimeout(shimmerTimeout);
    };
  }, [initalCardData]);

  const handleSelectCard = (data: CardData) => {
    setSelectedCardData(data)
  }

  const handleModal = () => {
    setShowModal(true)
    setOpen(true);
  }


  return (
    <>
      <div className="mx-auto py-4 bg-slate-50 border rounded-lg drop-shadow-md" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {initalCardData.map((data) => {
            return (
              <div
                className="card my-2 py-4 flex-1 bg-zinc-50 rounded-lg"
                key={data.id}
                style={{ margin: "1rem", backgroundColor: selectedCardData.id === data.id ? "#c9c9c9" : "white" }}
                onClick={() => handleSelectCard(data)}
              >
                {showShimmer ? (
                  <ShimmeringDiv className="p-4" style={{ marginLeft: "1rem", width: "60%", marginBottom: "1rem" }}>
                  </ShimmeringDiv>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', padding: "1rem" }}>
                    <span style={{ color: "black", fontFamily: "sans-serif", fontSize: "1rem", fontWeight: "650", borderBottom: '1px dotted black' }}>{data.label}</span>
                    {selectedCardData.id === data.id && <EditIcon style={{ margin: "auto", color: "grey" }} className="h-6 w-6 text-grey-500" onClick={handleModal} />}
                  </div>)}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {showShimmer ? (
                    <ShimmeringDiv className="p-4" style={{ marginLeft: "1rem", width: "80%" }}>
                    </ShimmeringDiv>
                  ) : (
                    <>
                      <span className="p-4" style={{ color: 'black', fontFamily: 'sans-serif', fontSize: '2rem', fontWeight: '650' }}>
                        {data.value}
                      </span>
                      <ArrowDropUpIcon sx={{ marginTop: '1.8rem' }} />
                      <Typography style={{ marginTop: '1.8rem' }}>{data.rate}%</Typography>
                    </>
                  )}
                </div>

              </div>
            )
          })}
          <div>
            {showGraph ? <ChevronDownIcon className="h-6 w-6 text-grey-500" style={{ margin: '3rem', cursor: 'pointer' }} onClick={() => setShowGraph(!showGraph)} /> : <ChevronUpIcon className="h-6 w-6 text-grey-500" style={{ margin: '3rem', cursor: 'pointer' }} onClick={() => setShowGraph(!showGraph)} />}
          </div>
        </div>
        {showModal && <ModalView open={open} setOpen={setOpen} revenueData={revenueData} selectedCardData={selectedCardData} setInitialCardData={setInitialCardData} />}
        {showGraph &&
          <div className="card my-2 py-4 flex-1 bg-slate-50 rounded-lg">
            {tabs?.map(tab => (
              <div key={tab.id}>
                {tab.content}
              </div>
            ))}
          </div>
        }
      </div>
    </>
  );
};

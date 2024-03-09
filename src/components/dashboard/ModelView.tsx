import React, { useState , useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions , Typography } from '@material-ui/core';
import { CardData } from "../../interfaces";
import HelpIcon from '@mui/icons-material/Help';
import { FaChartLine } from "react-icons/fa6";

type ModalViewProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    revenueData : CardData[]
    selectedCardData : CardData
    setInitialCardData: (value: CardData[]) => void;
};

const ModalView: React.FC<ModalViewProps> = ({ open, setOpen, revenueData,  setInitialCardData }) => {
    const [modelData, setModelData] = useState(revenueData);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleHover = (index : Any) => {
        setHoveredIndex(index);
      };
    
      const handleLeave = () => {
        setHoveredIndex(null);
      };

      const handleSelectedModalData = (data) => {
        setInitialCardData((prevData: CardData[]) => {
          const existingIndex = prevData.findIndex((item) => item.id === data.id);
          if (existingIndex !== -1) {
            const updatedData = [...prevData];
            updatedData[existingIndex] = data;
            return updatedData;
          } else {
            return [...prevData.slice(0, 3), data, ...prevData.slice(4)];
          }
        });
        setOpen(false);
      };
      
      

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="modal-title">
                <DialogContent>
                {modelData?.map((data, index) => (
              <div key={data.id} style={{display: "flex", flexDirection: "row" , padding : "3px" , marginBottom : "1rem", width:"18rem" , backgroundColor: hoveredIndex === index ? "lightgray" : "white", cursor: "pointer"}} onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}>
                <FaChartLine style={{marginLeft:"0.8rem"}}/>
                <Typography style={{ marginLeft: '0.5rem', marginRight: "3rem" }} onClick={() => handleSelectedModalData(data)}>{data.label}</Typography> 
                {hoveredIndex === index && (
                <HelpIcon />
              )}
                <br/>
              </div>
            ))}
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModalView;

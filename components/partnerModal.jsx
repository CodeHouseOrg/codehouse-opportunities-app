import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Flex } from "@chakra-ui/react";

const sectionStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  gridRowGap: "10px",
  alignItems: "center"
};

const h2Style = { fontSize: "40px", fontWeight: "bold", paddingLeft: "25px", };
const h3Style = { fontSize: "20px", fontWeight: "bold", paddingLeft: "100px", width: "250px" };
const pStyle = { fontSize: "14px", color: "#555", paddingRight: "100px", width: "350px" };
const headerStyle = { display: "flex", alignItems: "center", paddingBottom: "5px", paddingTop: "5px" }
const asideStyle = {
  border: "1px solid black",
  width: "50px",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  color: "white",
  background: "#2C2C2C",
  marginLeft: "25px"
}

export const PartnerModal = ({ open, onCloseModal, title, partnerTypes, tier, involvedInPrograms, location, about, website }) => {
  return (
    <Flex>
      <Modal open={open} onClose={onCloseModal} center
        styles={{
          modal: {
            background: "#FFFFFF",
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Arial', sans-serif",
          },
        }}
      >
        <header style={headerStyle}>
          <aside style={asideStyle}>
            <h4>{title[0]}</h4>
          </aside>
          <h2 style={h2Style}>{title}</h2>
        </header>
        <section style={sectionStyle}>

          <h3 style={h3Style}>Partner Type:</h3>
          <p style={pStyle}>{partnerTypes}</p>

          <h3 style={h3Style}>Tier:</h3>
          <p style={pStyle}>{tier}</p>

          <h3 style={h3Style}>Involved in Programs:</h3>
          <p style={pStyle}>{involvedInPrograms}</p>

          <h3 style={h3Style}>Location:</h3>
          <p style={pStyle}>{location}</p>

          <h3 style={h3Style}>About:</h3>
          <p style={pStyle}>{about}</p>

          <h3 style={h3Style}>Website:</h3>
          <p style={{
            fontSize: "14px", color: "#6F0010", paddingRight: "100px",
          }}>{website}</p>
        </section>
        <Link href="/talent/opportunities" style={{ display: "flex", justifyContent: "center" }}>
          <Button bg="#2C2C2C" color="white" >
            View Opportunites
          </Button>
        </Link>
      </Modal>
    </Flex >
  )
}


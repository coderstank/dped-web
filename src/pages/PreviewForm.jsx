import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col, Space, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { getCandidatesById } from "../api/auth";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

const { Title } = Typography;

const PreviewForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const user = useSelector((state) => state.auth.user);
  const [principalSignature, setPrincipalSignature] = useState("");

  const handlePrint = () => {
    window.print();
  };
  const fetchCandidate = async () => {
    try {
      setLoading(true);
      const { data } = await getCandidatesById(id);
      console.log("data", data);
      setData(data);
      setPrincipalSignature(
        `${import.meta.env.VITE_BASE_URL}/images/principal-signature/` +
          data.principal_signature
      );
    } catch (error) {
      notification.error({
        message: "Error fetching candidate data",
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, [id]);

  return (
    <div id="form-container">
      <Card>
        <Row
          justify="center"
          align="middle"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Col>
            <img
              src="/images/biharBoard.png"
              alt="College Logo"
              style={{ width: "100px", height: "auto", marginRight: "20px" }}
            />
          </Col>
          <Col>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                textAlign: "center",
              }}
            >
              BIHAR SCHOOL EXAMINATION BOARD
              <h5
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  textAlign: "left",
                  marginTop: "5px",
                }}
              >
                Dped registration form ke niche SESSION - (2024-2026)
              </h5>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "15px" }}>
            <strong>College Name:</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "15px" }}>
            {data.college_name}
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "15px" }}>
            <strong>College Code</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "15px" }}>
            {data.college_code}
          </Col>
        </Row>

        <Row>
          <Col span={18} style={{ border: "1px solid #000", padding: "8px" }}>
            <h2 style={{ marginTop: "0", marginBottom: "10px" }}>
              Personal Information
            </h2>
            <Row gutter={[16, 16]}>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "15px" }}
              >
                <strong>Application ID:</strong>
              </Col>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "15px" }}
              >
                {data.application_state}
              </Col>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "15px" }}
              >
                <strong>Medium of Appearing:</strong>
              </Col>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "15px" }}
              >
                {data.exam_medium}
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "15px" }}
              >
                <strong>Candidate's Name:</strong>
              </Col>
              <Col
                span={18}
                style={{ border: "1px solid #000", padding: "15px" }}
              >
                {data.name}
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "15px" }}
              >
                <strong>Mother's Name:</strong>
              </Col>
              <Col
                span={18}
                style={{ border: "1px solid #000", padding: "15px" }}
              >
                {data.mother_name}
              </Col>
            </Row>

            <Row gutter={[16, 16]} >
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "15px",borderBottom:"none" }}
              >
                <strong>Father's Name:</strong>
              </Col>
              <Col
                span={18}
                style={{ border: "1px solid #000", padding: "15px",borderBottom:"none" }}
              >
                {data.father_name}
              </Col>
            </Row>

           
          </Col>

          <Col
            span={6}
            style={{
              textAlign: "center",
              border: "1px solid #000",
              padding: "10px",
            }}
          >
            <div
              style={{
                width: 150,
                height: 180,
                border: "1px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                overflow: "hidden",
              }}
            >
              {data.photo ? (
                <img
                  src={data.photo}
                  alt="Student Photo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <p>Student Photo</p>
              )}
            </div>

            <div
              style={{
                width: 150,
                height: 50,
                border: "1px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px auto 0",
                overflow: "hidden",
              }}
            >
              {data.sign ? (
                <img
                  src={data.sign}
                  alt="Student Signature"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <p>Signature</p>
              )}
            </div>
          </Col>
        </Row>
        <Row>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "10px" }}
              >
                <strong>Date of Birth:</strong>
              </Col>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "10px" }}
              >
                {data.dob ? moment(data.dob).format("DD/MM/YYYY") : "N/A"}
              </Col>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "10px" }}
              >
                <strong>Gender</strong>
              </Col>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "10px" }}
              >
                {data.gender}
              </Col>
            </Row>

           
            <Row>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "10px" }}
              >
                <strong>Differently Abled:</strong>
              </Col>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "10px" }}
              >
                {data.differently_abled}
              </Col>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "10px" }}
              >
                <strong>Other Differently if:</strong>
              </Col>
              <Col
                span={6}
                style={{ border: "1px solid #000", padding: "10px" }}
              >
                {data.differently_abled_others}
              </Col>
            </Row>
        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
             <strong>Age as on 01.01.2024:</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
           {data.dob ? moment(data.dob).format("YYYY/MM/DD") : "N/A"}
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Caste Category:</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.category}
          </Col>
        </Row>
        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Nationality</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.nationality}
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Other Nationality</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.nationality_others}
          </Col>
        </Row>
        <Row style={{ border: "1px solid #000", padding: "5px" }}>
          {/* <Title level={3}>Additional Information</Title> */}
          <h2 style={{ marginTop: "0", marginBottom: "5px" }}>
            Additional Information
          </h2>
        </Row>

        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Class XII passing Board's Name:</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.class_12_board_name}
          </Col>

          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Class XII passing Board's Roll code</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.class_12_board_code}
          </Col>
        </Row>

        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Roll Number</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.roll_no}
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>E-mail Id:</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "5px" }}>
            {data.email}
          </Col>
        </Row>

        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Marital Status</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.marital_status}
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Religion</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.religion}
          </Col>
        </Row>

        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>First Identification Mark</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.identification_marks}
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Second Identification Mark</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.identification_marks_2}
          </Col>
        </Row>
        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Mobile no of student:</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.mobile_number}
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Passing Year:</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.passing_year}
          </Col>
        </Row>

        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Marks Obtained</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.marks_obtained}
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>% of Marks</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.percentage_of_marks}
          </Col>
        </Row>

        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Address:</strong>
          </Col>
          <Col span={18} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.address}
          </Col>
        </Row>
        <Row>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Pincode</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.pincode}
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            <strong>Aadhar Number</strong>
          </Col>
          <Col span={6} style={{ border: "1px solid #000", padding: "10px" }}>
            {data.aadhar_no}
          </Col>
        </Row>
        {data.aadhar_declaration && (
          <Row>
            <Col
              style={{ border: "1px solid #000", padding: "10px" }}
              span={24}
            >
              <Space direction="vertical">
                <Title style={{ margin: "0px 0px 10px" }} level={5}>
                  Aadhar Declaration
                </Title>
                <p style={{ height: "auto" }}>
                  यदि विद्यार्थी के द्वारा उपर्युक्त क्रमांक-22 में ''आधार
                  नंबर'' अंकित नहीं किया गया है, तो उनके द्वारा निम्नांकित घोषणा
                  की जाएगीः- (कृपया नोट करें कि यहाँ किसी भी तरह की गलत घोषणा के
                  लिए विद्यार्थी के विरूद्ध कार्रवाई की जा सकेगी तथा आधार नम्बर
                  नहीं होने के संबंध में इस मिथ्या/गलत घोषणा के कारण उनका
                  अभ्यर्थित्व रद्द किया जा सकता है।)
                </p>
                <p style={{ height: "auto" }}>
                  घोषणा
                  <br />
                  मैं, एतद् द्वारा घोषित करता हूँ कि मैंने ''आधार नंबर'' आवंटित
                  करने के लिए आवेदन नहीं किया है तथा मुझे ''आधार नंबर'' आवंटित
                  नहीं हुआ है। मैं यह भी समझता हूँ कि मेरे द्वारा की गई इस
                  मिथ्या/गलत घोषणा के आधार पर मेरा अभ्यर्थित्व रद्द किया जा सकता
                  है।
                </p>
                <p style={{ height: "auto" }}>
                  If student has not given "Aadhar number" in Sl. No. 19 above,
                  then following declaration should be given by student :-
                  (Please note that any WRONG DECLARATION made here, may invite
                  action against the student and his/her candidature may be
                  cancelled due to making falseful declaration about
                  non-allotment of "Aadhar number")
                </p>
                <p style={{ height: "auto" }}>
                  DECLARATION
                  <br />
                  I, hereby declare that I have not enrolled in Aadhar and have
                  not got any "Aadhar number". I also understand that any false
                  declaration made by me in this regard may have consequence of
                  cancellation of my candidature.
                </p>
              </Space>
            </Col>
          </Row>
        )}
        <Row>
          <Col style={{ padding: "10px" }} span={24}>
            <Title
              style={{ margin: "0px 0px 10px", textAlign: "center" }}
              level={4}
            >
              DECLARATION
            </Title>
            <p style={{ height: "auto" }}>
              I confirm that the informations given in this form is true,
              complete and accurate to the best of my knowledge and belief and
              in case any of the above informations is found to be false or
              untrue or misleading or misrepresenting, it may lead to
              cancellation of the my candidature and BSEB can take legal action
              against me.
            </p>
            <p style={{ height: "auto" }}>
              I declare that the above informations are true and as per the
              college record. The registration of the candidate may be allowed.
            </p>
          </Col>
        </Row>

        <Row>
          <Col
            style={{
              padding: "5px",
              position: "relative",
              minHeight: "200px",
            }}
            span={24}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    border: "1px solid black",
                    width: "150px",
                    height: "80px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  {data.sign ? (
                    <img
                      src={data.sign}
                      alt="Student's Signature"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <p>Student's Signature</p>
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    border: "1px solid black",
                    width: "150px",
                    height: "80px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  {principalSignature ? (
                    <img
                      src={principalSignature}
                      alt="Principal Signature"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <p>Principal's Signature</p>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={handlePrint}
              className="print-hide"
              style={{ width: "100%" }}
            >
              Print Form
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PreviewForm;

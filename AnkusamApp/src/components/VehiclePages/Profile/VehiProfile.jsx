import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { RiMapPinUserFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import VehiLogUserContext from "../../../context/vehicleLoginUser/VehiLogUserContext";
import Typed from "typed.js"; // Importing Typed.js for typing animation
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // status percentage complete animation show
import "react-circular-progressbar/dist/styles.css"; // styles status percentage complete animation show
import { Link, json, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGfg from "../../../data/GfgLoding/loading.gif";
import { weightdata } from "../../../data/WeightData";
import { RiVerifiedBadgeFill } from "react-icons/ri";

function VehiProfile() {
  //👇 global variables access vehicle login user details
  const { vehiLogUser } = useContext(VehiLogUserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("TokeLoginVehiPage")) {
      navigate("/vehiclelogin");
      return;
    }
  }, []);

  const typedRef = useRef(null);
  const typedRefPhone = useRef(null);

  const percentage = 70; // Assuming user has completed 70% of their profile

  // Function to determine color based on percentage
  const getColor = (percentage) => {
    const red = Math.floor((100 - percentage) * 2.55);
    const green = Math.floor(percentage * 2.55);
    return `rgb(${red}, ${green}, 0)`;
  };

  useEffect(() => {
    const options = {
      strings: ["Welcome to The Ankusam Logistics!"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options); // Initializing typing animation
    const typedPhone = new Typed(typedRefPhone.current, options); // Initializing typing animation

    return () => {
      typed.destroy(); // Cleanup animation on component unmount
      typedPhone.destroy(); // Cleanup animation on component unmount
    };
  }, []);

  // loading animation state handle
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState("Upload failed");

  //=====================👇Start Form Text section👇==============================

  const [driverVehiFormText, setDriverVehiFormText] = useState({
    name: "",
    aadhar_number: "",
    phone: "",
    htown: "",
    driving_license_number: "",
    license_type: "",
    vehicle_register_number: "",
    vehicle_make_and_model: "",
    operator_type: "",
    vehicle_name: "",
    vehicle_length: "",
    vehicle_capacity_in_tons: "",
    vehicle_type: "",
  });

  const handleDriverVehiFormTextChange = (e) => {
    const { name, value } = e.target;
    setDriverVehiFormText((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDriverVehiFormTextSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (isNaN(driverVehiFormText.phone)) {
      toast.warn("Invalid Phone Number!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (isNaN(driverVehiFormText.aadhar_number)) {
      toast.warn("Invalid Aadhar Number!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const formData = new FormData();
    formData.append("driver_id", vehiLogUser?.driver_id);
    formData.append("driver_name", driverVehiFormText.name);
    formData.append("aadhar_number", driverVehiFormText.aadhar_number);
    formData.append("driver_mobile_number", driverVehiFormText.phone);
    formData.append("htown", driverVehiFormText.htown);
    formData.append(
      "driving_license_number",
      driverVehiFormText.driving_license_number.toUpperCase()
    );
    formData.append("license_type", driverVehiFormText.license_type);
    formData.append(
      "vehicle_register_number",
      driverVehiFormText.vehicle_register_number.toUpperCase()
    );
    formData.append(
      "vehicle_make_and_model",
      driverVehiFormText.vehicle_make_and_model.toUpperCase()
    );
    formData.append("operator_type", driverVehiFormText.operator_type);
    formData.append(
      "vehicle_name",
      driverVehiFormText.vehicle_name.toUpperCase()
    );
    formData.append("vehicle_length", driverVehiFormText.vehicle_length);
    formData.append(
      "vehicle_capacity_in_tons",
      driverVehiFormText.vehicle_capacity_in_tons
    );
    formData.append("vehicle_type", driverVehiFormText.vehicle_type);

    try {
      const response = await axios.post(
        "/api/drivers/profiles/driver_profile_text_field.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        setIsLoading(false);
        toast.success("Success submit!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setIsLoading(false);
        toast.error("Submit faild", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      setIsLoading(false);
      {
        error.message === "Network Error" ||
        error.message === "Request failed with status code 500"
          ? setIsErrorMessage("Network Error")
          : setIsErrorMessage("Submit failed");
      }

      toast.error(isErrorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("Error: ", error);
    }
  };

  //=====================👆End Form Text section👆=============================

  //=====================👇Start vehicles 4 sides photos upload section👇==============================

  // image upload after successful message show vehicle text
  const [isVehiImgUpload, setIsVehiImgUpload] = useState(false);

  const [filesVehicle, setFilesVehicle] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
  });

  const handleVehicleFileChange = (e) => {
    const { name, files } = e.target;
    setFilesVehicle((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleVehiclePhotoSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("driver_id", vehiLogUser?.driver_id);
    formData.append("vehical_photos_front", filesVehicle.front);
    formData.append("vehical_photos_back", filesVehicle.back);
    formData.append("vehical_photos_left", filesVehicle.left);
    formData.append("vehical_photos_right", filesVehicle.right);

    try {
      const response = await axios.post(
        "/api/drivers/profiles/upload_vehicle_photo_upload.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        setIsVehiImgUpload(true);
        setIsLoading(false);
        toast.success("Success upload!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setIsVehiImgUpload(false);
        setIsLoading(false);
        toast.error("Upload faild", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      setIsVehiImgUpload(false);
      setIsLoading(false);

      {
        error.message === "Network Error" ||
        error.message === "Request failed with status code 500"
          ? setIsErrorMessage("Network Error")
          : setIsErrorMessage("Upload failed");
      }

      toast.error(isErrorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("Error: ", error);
    }
  };

  //=====================👆End vehicles 4 sides photos upload section👆=============================

  //=====================👇Start Pollution section👇==============================

  // image upload after successful message show pollution text
  const [isPollutionImgUpload, setIsPollutionImgUpload] = useState(false);

  const [pollFile, setPollFile] = useState({
    pollution_certification: null,
  });

  const handlePollutionChange = (e) => {
    const { name, files } = e.target;
    setPollFile((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handlePollutionSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("driver_id", vehiLogUser?.driver_id);
    formData.append(
      "pollution_certification",
      pollFile.pollution_certification
    );

    try {
      const response = await axios.post(
        "/api/drivers/profiles/upload_vehicle_polution_certificates.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        setIsPollutionImgUpload(true);
        setIsLoading(false);
        toast.success("Success upload!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setIsPollutionImgUpload(false);
        setIsLoading(false);
        toast.error("Upload faild", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      setIsPollutionImgUpload(false);
      setIsLoading(false);

      {
        error.message === "Network Error" ||
        error.message === "Request failed with status code 500"
          ? setIsErrorMessage("Network Error")
          : setIsErrorMessage("Upload failed");
      }

      toast.error(isErrorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("Error: ", error);
    }
  };

  //=====================👆 End Pollution section 👆==============================

  //=====================👇Start Vehicle Reg. or book rc section👇==============================

  // image upload after successful message show vehicle registration text
  const [isRegistrationImgUpload, setIsRegistrationImgUpload] = useState(false);

  const [filesRegistration, setFilesRegistration] = useState({
    regFront: null,
    regBack: null,
  });

  const handleRegistrationFileChange = (e) => {
    const { name, files } = e.target;
    setFilesRegistration((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleRegSumbmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("driver_id", vehiLogUser?.driver_id);
    formData.append("book_rc_front", filesRegistration.regFront);
    formData.append("book_rc_back", filesRegistration.regBack);

    try {
      const response = await axios.post(
        "/api/drivers/profiles/upload_vehicle_registration_certificates.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        setIsRegistrationImgUpload(true);
        setIsLoading(false);
        toast.success("Success upload!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setIsRegistrationImgUpload(false);
        setIsLoading(false);
        toast.error("Upload faild", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      setIsRegistrationImgUpload(false);
      setIsLoading(false);

      {
        error.message === "Network Error" ||
        error.message === "Request failed with status code 500"
          ? setIsErrorMessage("Network Error")
          : setIsErrorMessage("Upload failed");
      }

      toast.error(isErrorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("Error: ", error);
    }
  };

  //=====================👆 End  Vehicle Reg. or book rc section 👆==============================

  //=====================👇Start Vehicle Insurance section👇==============================

  // image upload after successful message show vehicle insurance text
  const [isInsuranceImgUpload, setIsInsuranceImgUpload] = useState(false);

  const [insurance, setInsurance] = useState({
    insurance: null,
  });

  const handleInsuranceChange = (e) => {
    const { name, files } = e.target;
    setInsurance((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleInsuranceSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("driver_id", vehiLogUser?.driver_id);
    formData.append("insurance", insurance.insurance);

    try {
      const response = await axios.post(
        "/api/drivers/profiles/upload_vehicle_insurance_photo.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log('====================================');
      // console.log("Response: " + JSON.stringify(response, null, 2));
      // console.log('====================================');

      if (response.data) {
        setIsInsuranceImgUpload(true);
        setIsLoading(false);
        toast.success("Success upload!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setIsInsuranceImgUpload(false);
        setIsLoading(false);
        toast.error("Upload faild", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      setIsInsuranceImgUpload(false);
      setIsLoading(false);

      {
        error.message === "Network Error" ||
        error.message === "Request failed with status code 500"
          ? setIsErrorMessage("Network Error")
          : setIsErrorMessage("Upload failed");
      }

      toast.error(isErrorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("Error: ", error);
    }
  };

  //=====================👆 End  Insurance section 👆==============================

  //=====================👇Start Adhar Card And Driving license section👇==========================

  // image upload after successful message show adhar and license text
  const [isAdharLicenseImgUpload, setIsAdharLicenseImgUpload] = useState(false);

  const [fileAdharLicense, setFileAdharLicense] = useState({
    adhar_front: null,
    adhar_back: null,
    driving_lic_front: null,
    driving_lic_back: null,
  });

  const handleAdharLicenseFileChange = (e) => {
    const { name, files } = e.target;
    setFileAdharLicense((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleAdharLicenseSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("driver_id", vehiLogUser?.driver_id);
    formData.append("adhar_card_img", fileAdharLicense.adhar_front);
    formData.append("adhar_card_back_img", fileAdharLicense.adhar_back);
    formData.append(
      "driving_lic_front_img",
      fileAdharLicense.driving_lic_front
    );
    formData.append("driving_lic_back_img", fileAdharLicense.driving_lic_back);

    try {
      const response = await axios.post(
        "/api/drivers/profiles/upload_driver_certificates_aadhar.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        setIsAdharLicenseImgUpload(true);
        setIsLoading(false);
        toast.success("Success upload!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setIsAdharLicenseImgUpload(false);
        setIsLoading(false);
        toast.error("Upload faild", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      setIsAdharLicenseImgUpload(false);
      setIsLoading(false);

      {
        error.message === "Network Error" ||
        error.message === "Request failed with status code 500"
          ? setIsErrorMessage("Network Error")
          : setIsErrorMessage("Upload failed");
      }

      toast.error(isErrorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("Error: ", error);
    }
  };

  //=====================👆 End  Adhar Card And Driving license section 👆==============================

  //=============👇Start Driver all text details featch section 👇===================

  const [driverVehiAllDetails, setDriverVehiAllDetails] = useState("");

  useEffect(() => {
    const fetchDriverVehiAllDetails = async () => {
      const formData = new FormData();
      formData.append("driver_id", vehiLogUser?.driver_id);

      try {
        const response = await axios.post(
          "/api/drivers/profiles/get_driver_profile_text_field.php",
          formData
        );

        // console.log("Response: ", JSON.stringify(response, null, 2));
        // console.log("Response2: ", response.data.data);

        setDriverVehiAllDetails(response.data.data);
        setDriverVehiFormText(response.data.data); // text update in state
      } catch (error) {
        console.log(error);
      }
    };
    fetchDriverVehiAllDetails();
  }, []);

  //=============👆End Driver all text details featch section 👆===================

  //=============👇Start Driver all Upload Photo featch section 👇===================

  const [driverVehiAllPhoto, setDriverVehiAllPhoto] = useState("");

  useEffect(() => {
    const fetchDriverVehiAllPhoto = async () => {
      const formData = new FormData();
      formData.append("driver_id", vehiLogUser?.driver_id);

      try {
        const response = await axios.post(
          "/api/drivers/profiles/get_all_photos.php",
          formData
        );

        // console.log("Photo Response2: ", response.data.data.adhar_card_back_img);

        setDriverVehiAllPhoto(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDriverVehiAllPhoto();
  }, []);

  //=============👆End Driver all Upload Photo featch section 👆===================

  return (
    <>
      <div className="mt-16 w-full h-full relative">
        {/* Loading image section */}
        <div
          className={`w-full -mt-16 md:h-[125%] h-[128%] z-50 bg-[rgba(0,0,0,0.5)] absolute ${
            isLoading ? "" : "hidden"
          }`}
        >
          <div className=" absolute w-full h-screen flex justify-center items-center">
            <img
              className="w-[100px] h-[100px] fixed"
              src={loadingGfg}
              alt=""
            />
          </div>
        </div>

        {/* First Banner Part */}
        <div className="bg-vehicleTruckImgProfile w-full bg-no-repeat bg-cover ">
          {/* Top image background section */}
          <div className="w-full md:h-[560px] h-[400px] mx-auto bg-[rgba(0,0,0,0.5)] text-white">
            <div className="w-[90%] mx-auto md:pt-28 pt-10 flex justify-around">
              <div className="md:w-[30%]">
                <h1 className="text-3xl uppercase font-bold underline text-[#3ef94d] md:block hidden">
                  <span className="text-[#f460f9]">User</span>{" "}
                  <span className="text-[#f95151]">Profile</span>
                </h1>
                <div className="md:mt-20 mt-4">
                  <h1 className="text-3xl font-bold text-[#3ef94d]">
                    Hello{" "}
                    {/* <span className="uppercase text-[yellow]">
                      {vehiLogUser?.name}
                    </span> */}
                  </h1>
                  <h1 className="md:text-3xl font-bold my-3">
                    {vehiLogUser?.userid}
                  </h1>
                  <p className="md:text-xl italic font-semibold text-[yellow]">
                    This is your <span className="text-[white]">profile</span>{" "}
                    page. You can see the{" "}
                    <span className="text-[#3ef94d]">progress</span> you've made
                    with your Profile.
                  </p>
                </div>
              </div>
              {/* Typed js Text or moving text */}
              <div className="md:w-[50%] md:text-4xl text-center font-serif mt-28 bg-clip-text text-transparent bg-gradient-to-r from-[#3ef94d] via-[yellow] to-[red] -ml-[10%] md:block hidden">
                <span ref={typedRef} className=" font-bold"></span>
              </div>
              {/* User profile */}
              <div className="md:flex md:flex-col items-center">
                <RiMapPinUserFill className="md:text-7xl text-4xl text-[#86f860]" />
                <span className="uppercase text-[yellow] md:text-2xl font-bold">
                  {vehiLogUser?.name}
                </span>
                <h1 className="md:text-xl font-bold">{vehiLogUser?.userid}</h1>
              </div>
            </div>
            <div className="md:hidden mt-8 w-[80%] mx-auto text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3ef94d] via-[yellow] to-[red] text-xl font-semibold italic">
              <span ref={typedRefPhone}></span>
            </div>
          </div>
        </div>

        {/* Account Form Section or Form Text section*/}
        <div className="w-[90%] mx-auto lg:mt-6 h-full flex justify-evenly lg:flex-row flex-col gap-4 pb-16">
          {/* Form section */}
          <div className="lg:w-[70%] w-[100%] mx-auto md:mt-0 mt-4 pb-8 bg-gray-300 border shadow-md shadow-gray-800 lg:order-1 order-2 rounded-lg">
            <div className="flex justify-between px-2 py-4 bg-white">
              <h1 className="md:text-2xl text-xl font-semibold">My Account</h1>
              <h1 className="md:text-2xl text-xl font-semibold bg-blue-500 hover:bg-blue-600 duration-300 px-2 py-1 rounded-lg text-white cursor-pointer">
                <Link to="/loaddatalist">Home</Link>
              </h1>
            </div>

            {/* Text form section */}
            <form
              onSubmit={handleDriverVehiFormTextSubmit}
              action=""
              className="px-4 pt-2"
            >
              <div className="grid sm:grid-cols-2 md:mt-6">
                <div>
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Name{" "}
                    <span
                      className={`${
                        !driverVehiFormText.name && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={driverVehiFormText?.name || ""}
                    onChange={handleDriverVehiFormTextChange}
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Phone Number{" "}
                    <span
                      className={`${
                        !driverVehiFormText.phone && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    minLength={10}
                    maxLength={15}
                    name="phone"
                    value={driverVehiFormText?.phone || ""}
                    onChange={handleDriverVehiFormTextChange}
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>

                <div>
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Aadhar Numbar{" "}
                    <span
                      className={`${
                        !driverVehiFormText.aadhar_number && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <input
                    type="tel"
                    placeholder="Aadhar number"
                    minLength={12}
                    maxLength={12}
                    name="aadhar_number"
                    value={driverVehiFormText?.aadhar_number || ""}
                    onChange={handleDriverVehiFormTextChange}
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Home Town
                    <span
                      className={`${
                        !driverVehiFormText.htown && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <input
                    type="text"
                    placeholder="Home Town"
                    name="htown"
                    value={driverVehiFormText?.htown || ""}
                    onChange={handleDriverVehiFormTextChange}
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>
              </div>

              {/* <div className="grid sm:grid-cols-2 md:mt-6">
                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Home Town2 (optional)
                  </h1>
                  <input
                    type="text"
                    placeholder="Home Town3 (optional)"
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>
                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Home Town3 (optional)
                  </h1>
                  <input
                    type="text"
                    placeholder="Home Town3 (optional)"
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>
              </div> */}

              <hr className="md:mt-12 mt-6 w-[94%]" />
              {/*👉 Vehicle and license details */}
              <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                Driving license Number{" "}
                <span
                  className={`${
                    !driverVehiFormText.driving_license_number && "hidden"
                  } text-blue-500`}
                >
                  <RiVerifiedBadgeFill />
                </span>
              </h1>
              <input
                type="text"
                placeholder="Driving license number.."
                name="driving_license_number"
                value={driverVehiFormText?.driving_license_number || ""}
                onChange={handleDriverVehiFormTextChange}
                className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
              />

              <div className="grid lg:grid-cols-3 sm:grid-cols-2 mt-4">
                <div>
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    License Type{" "}
                    <span
                      className={`${
                        !driverVehiFormText.license_type && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <select
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%] cursor-pointer"
                    name="license_type"
                    value={driverVehiFormText?.license_type || ""}
                    onChange={handleDriverVehiFormTextChange}
                  >
                    <option value="">Select License Type</option>
                    <option value="Heavy">Heavy</option>
                    <option value="Batch">Batch</option>
                  </select>
                </div>

                <div>
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Operator Type{" "}
                    <span
                      className={`${
                        !driverVehiFormText.operator_type && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <select
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%] cursor-pointer"
                    name="operator_type"
                    value={driverVehiFormText?.operator_type || ""}
                    onChange={handleDriverVehiFormTextChange}
                  >
                    <option value="">Select Operator Type</option>
                    <option value="Owner">Owner</option>
                    <option value="Driver">Driver</option>
                  </select>
                </div>

                <div>
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Vehicle Type{" "}
                    <span
                      className={`${
                        !driverVehiFormText.vehicle_type && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <select
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%] cursor-pointer"
                    name="vehicle_type"
                    value={driverVehiFormText?.vehicle_type || ""}
                    onChange={handleDriverVehiFormTextChange}
                  >
                    <option value="">Select Type of Vehicle</option>
                    <option value="Open Body">Open Body</option>
                    <option value="Closed Body">Closed Body</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 mt-10">
                <div>
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Vehicle register Number{" "}
                    <span
                      className={`${
                        !driverVehiFormText.vehicle_register_number && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <input
                    type="text"
                    placeholder="Vehicle register Number"
                    name="vehicle_register_number"
                    value={driverVehiFormText?.vehicle_register_number || ""}
                    onChange={handleDriverVehiFormTextChange}
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Vehicle Name{" "}
                    <span
                      className={`${
                        !driverVehiFormText.vehicle_name && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <input
                    type="text"
                    placeholder="Vehicle name"
                    value={driverVehiFormText?.vehicle_name || ""}
                    name="vehicle_name"
                    onChange={handleDriverVehiFormTextChange}
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Vehicle Capacity(tons){" "}
                    <span
                      className={`${
                        !driverVehiFormText.vehicle_capacity_in_tons && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <select
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%] cursor-pointer"
                    name="vehicle_capacity_in_tons"
                    value={driverVehiFormText?.vehicle_capacity_in_tons || ""}
                    onChange={handleDriverVehiFormTextChange}
                  >
                    <option value="">Select capacity</option>
                    {weightdata.map((capacity, index) => {
                      return (
                        <option key={index} value={capacity}>
                          {capacity}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Vehicle make/model{" "}
                    <span
                      className={`${
                        !driverVehiFormText.vehicle_make_and_model && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <input
                    type="text"
                    name="vehicle_make_and_model"
                    value={driverVehiFormText?.vehicle_make_and_model || ""}
                    onChange={handleDriverVehiFormTextChange}
                    placeholder="Vehicle make and model"
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold flex items-center gap-1">
                    Vehicle Length{" "}
                    <span
                      className={`${
                        !driverVehiFormText.vehicle_length && "hidden"
                      } text-blue-500`}
                    >
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <input
                    type="text"
                    name="vehicle_length"
                    value={driverVehiFormText?.vehicle_length || ""}
                    onChange={handleDriverVehiFormTextChange}
                    placeholder="Vehicle length"
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>
              </div>
              {/* Button Section */}
              <div className="w-full mx-auto text-center my-6">
                <button
                  type="submit"
                  className="w-[120px] text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-fuchsia-400 to-red-500 hover:from-pink-500 hover:to-yellow-500"
                >
                  Submit
                </button>
              </div>
            </form>
            <hr className="w-[94%] mx-auto" />

            {/* All phot upload section */}
            <div className="px-2">
              {/* Photo Upload section */}
              <div className="mt-4 grid sm:grid-cols-2">
                {/* Vehicle photo */}
                <form onSubmit={handleVehiclePhotoSubmit}>
                  <h1 className="md:text-[25px] text-[20px] pt-2 font-semibold text-purple-600">
                    Upload Vehicle Photos
                  </h1>
                  <div className="overflow-hidden">
                    {/* vehicle front photo */}
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-purple-600 mt-2 flex items-center gap-1">
                        Vehicle Front photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.vehical_photos_front &&
                            "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isVehiImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      {/* if upload vehicle front photo show text in browser*/}
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.vehical_photos_front}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.vehical_photos_front}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="front"
                        onChange={handleVehicleFileChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    {/* vehicle back photo */}
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-purple-600 mt-2 flex items-center gap-1">
                        Vehicle Back photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.vehical_photos_back &&
                            "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isVehiImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      {/* if upload vehicle back photo show text in browser*/}
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.vehical_photos_back}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.vehical_photos_back}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="back"
                        onChange={handleVehicleFileChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    {/* vehicle left photo */}
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-purple-600 mt-2 flex items-center gap-1">
                        Vehicle Left Side photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.vehical_photos_left &&
                            "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isVehiImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      {/* if upload vehicle left photo show text in browser*/}
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.vehical_photos_left}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.vehical_photos_left}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="left"
                        onChange={handleVehicleFileChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    {/* vehicle right photo */}
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-purple-600 mt-2 flex items-center gap-1">
                        Vehicle Right Side photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.vehical_photos_right &&
                            "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isVehiImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      {/* if upload vehicle right photo show text in browser*/}
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.vehical_photos_right}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.vehical_photos_right}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="right"
                        onChange={handleVehicleFileChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-[120px] text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-gray-400 to-purple-600 hover:from-pink-500 hover:to-gray-500 mt-6"
                  >
                    upload
                  </button>
                </form>

                <div className="md:mt-0 mt-6">
                  {/* Vehicle Registration or book rc Document photo */}
                  <form onSubmit={handleRegSumbmit}>
                    <h1 className="md:text-[25px] text-[20px] pt-2 font-semibold text-gray-600">
                      Upload Vehicle Reg. Document
                    </h1>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-gray-600 mt-2 flex items-center gap-1">
                        Reg. Front photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.book_rc_front && "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isRegistrationImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.book_rc_front}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.vehical_photos_front}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="regFront"
                        onChange={handleRegistrationFileChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-gray-600 mt-2 flex items-center gap-1">
                        Reg. Back photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.book_rc_back && "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isRegistrationImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.book_rc_back}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.vehical_photos_back}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="regBack"
                        onChange={handleRegistrationFileChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    {/* Button Section */}
                    <button
                      type="submit"
                      className="w-[120px] text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-[#212121] to-zinc-400 hover:from-blue-500 hover:to-[#499d11] mt-6"
                    >
                      upload
                    </button>
                  </form>

                  {/*👉 Vehicle Insurance */}
                  <form onSubmit={handleInsuranceSubmit} className="mt-4">
                    <h1 className="md:text-[25px] text-[20px] pt-2 font-semibold text-blue-400">
                      Upload Vehicle Insurance
                    </h1>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-blue-400 mt-2 flex items-center gap-1">
                        Vehicle Insurance photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.insurance && "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isInsuranceImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      {/* if upload insurance show text in browser */}
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.insurance}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.insurance}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="insurance"
                        onChange={handleInsuranceChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    {/* Button Section */}
                    <button
                      type="submit"
                      className="w-[120px] text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-[#900497] to-blue-400 hover:from-blue-400 hover:to-yellow-500 mt-6"
                    >
                      upload
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2">
                {/* Adhar card and License section */}
                <form
                  onSubmit={handleAdharLicenseSubmit}
                  className="md:mt-0 mt-6"
                >
                  <div>
                    <h1 className="md:text-[25px] text-[20px] pt-2 font-semibold text-yellow-600">
                      Upload Adhar Card Document
                    </h1>
                    {/* adhar front photo */}
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-yellow-600 mt-2 flex items-center gap-1">
                        Aadhar Front photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.adhar_card_img && "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isAdharLicenseImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      {/* if upload Adhar front photo show text in browser */}
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.adhar_card_img}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.adhar_card_img}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="adhar_front"
                        onChange={handleAdharLicenseFileChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    {/* Aadhar back photo */}
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-yellow-600 mt-2 flex items-center gap-1">
                        Aadhar Back photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.adhar_card_back_img &&
                            "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isAdharLicenseImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      {/* if upload Adhar back photo show text in browser */}
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.adhar_card_back_img}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.adhar_card_back_img}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="adhar_back"
                        onChange={handleAdharLicenseFileChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Driver License upload section */}
                  <div>
                    <h1 className="md:text-[25px] text-[20px] pt-2 font-semibold text-yellow-800">
                      Upload Driving license
                    </h1>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-yellow-800 mt-2 flex items-center gap-1">
                        license Front photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.driving_lic_front_img &&
                            "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isAdharLicenseImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      {/* if upload driver license front photo show text in browser */}
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.driving_lic_front_img}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.driving_lic_front_img}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="driving_lic_front"
                        onChange={handleAdharLicenseFileChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-yellow-800 mt-2 flex items-center gap-1">
                        license Back photo{" "}
                        <span
                          className={`${
                            !driverVehiAllPhoto.driving_lic_back_img &&
                            "hidden"
                          } text-blue-500`}
                        >
                          <RiVerifiedBadgeFill />
                        </span>
                      </span>
                      <span
                        className={`text-green-800 font-serif  ${
                          isAdharLicenseImgUpload ? "" : "hidden"
                        }`}
                      >
                        upload successfully
                      </span>
                      {/* if upload driver license back photo show text in browser */}
                      <span className="w-[250px] overflow-hidden text-green-600">
                        <a
                          href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.driving_lic_back_img}`}
                          target="_blank"
                        >
                          {driverVehiAllPhoto?.driving_lic_back_img}
                        </a>
                      </span>
                      <input
                        type="file"
                        name="driving_lic_back"
                        onChange={handleAdharLicenseFileChange}
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                  </div>
                  {/* Button Section */}
                  <button
                    type="submit"
                    className="w-[120px] text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-neutral-500 to-yellow-600 hover:from-pink-500 hover:to-neutral-500 mt-4"
                  >
                    upload
                  </button>
                </form>

                {/* Pollution */}
                <form onSubmit={handlePollutionSubmit}>
                  <h1 className="md:text-[25px] mt-4 text-[20px] pt-2 font-semibold text-[#4a8fc3]">
                    Upload Pollution Certification
                  </h1>
                  <div className="grid grid-cols-1">
                    <span className="md:text-lg font-semibold text-[#4a8fc3] mt-2 flex items-center gap-1">
                      Pollution Certification (
                      <span className="text-[green]">Optional</span>){" "}
                      <span
                        className={`${
                          !driverVehiAllPhoto.pollution_certification && "hidden"
                        } text-blue-500`}
                      >
                        <RiVerifiedBadgeFill />
                      </span>
                    </span>
                    <span
                      className={`text-green-800 font-serif  ${
                        isPollutionImgUpload ? "" : "hidden"
                      }`}
                    >
                      upload successfully
                    </span>
                    {/* if upload vehicle pollution photo show text in browser */}
                    <span className="w-[250px] overflow-hidden text-green-600">
                      <a
                        href={`https://ankusamlogistics.com/api/drivers/profiles/${driverVehiAllPhoto?.pollution_certification}`}
                        target="_blank"
                      >
                        {driverVehiAllPhoto?.pollution_certification}
                      </a>
                    </span>
                    <input
                      type="file"
                      name="pollution_certification"
                      onChange={handlePollutionChange}
                      className="w-[200px] cursor-pointer"
                    />
                  </div>
                  {/* Button Section */}
                  <button
                    type="submit"
                    className="w-[120px] text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-[#67882d] to-[#4a8fc3] hover:from-range-500 hover:to-yellow-500 mt-4"
                  >
                    upload
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Profile status */}
          <div className="border lg:w-[30%] w-full min-h-[295px] md:mt-0 mt-4 bg-gray-300 mx-auto shadow-md shadow-gray-800 rounded-lg px-3 pt-4 lg:order-2 order-1">
            <h1 className="text-xl font-semibold flex items-center gap-1">
              <CgProfile className="text-[green] text-2xl" />
              Profiles status
            </h1>
            {/* <div className="md:w-48 md:h-48 w-40 h-40 mx-auto mt-4">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  textColor: "black",
                  pathColor: getColor(percentage),
                  trailColor: "white",
                })}
              />
              <h1 className="text-lg text-center font-semibold mt-2 text-[#4961e9]">
                Profile completion
              </h1>
            </div> */}

            {/* Profile Text part */}
            <div className="w-full md:mt-20 mt-14 lg:block hidden">
              <h1 className="text-[20px] font-semibold">
                🍁Welcome to Ankusam Logistics🍁
              </h1>
              <div className="text-lg mt-2">
                <h1 className=" font-semibold pt-3">
                  Your Trusted Partner in Indian Logistics Solutions
                </h1>
                <h1 className="mt-2 text-[19px]">
                  At Ankusam Logistics, we specialize in providing efficient,
                  reliable, and innovative logistics services tailored to meet
                  your unique needs within India. Our comprehensive solutions
                  ensure your goods are transported safely and on time, every
                  time.
                </h1>
                <h1 className="text-xl font-semibold my-4">Why Choose Us?</h1>
                <ul className="list-disc ml-4">
                  <li>
                    <span className="font-semibold">Nationwide Reach:</span>{" "}
                    With an extensive network across India, we deliver seamless
                    domestic shipping solutions.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Customer-Centric Approach:
                    </span>{" "}
                    Our dedicated team works around the clock to provide
                    personalized service and support.
                  </li>
                  <li>
                    <span className="font-semibold">Advanced Technology:</span>{" "}
                    Leveraging state-of-the-art technology to optimize logistics
                    operations and provide real-time tracking.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Sustainability Commitment:
                    </span>{" "}
                    Committed to eco-friendly practices and reducing our carbon
                    footprint in the logistics industry.
                  </li>
                </ul>
                <h1 className="text-xl font-semibold my-4">Our Services</h1>
                <ul className="list-disc ml-4">
                  <li>
                    <span className="font-semibold">Freight Forwarding:</span>{" "}
                    Expert handling of road freight to ensure your cargo reaches
                    its destination efficiently.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Supply Chain Management:
                    </span>{" "}
                    Comprehensive solutions to optimize your entire supply chain
                    process.
                  </li>
                </ul>
                <div className="">
                  <h1 className="text-xl font-semibold my-4">Get in Touch</h1>
                  <h1>
                    <span className=" font-bold text-[#d455da] text-[22px]">
                      R
                    </span>
                    eady to streamline your logistics operations? Contact us
                    today to learn how Ankusam Logistics can drive your business
                    forward within India.
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default VehiProfile;

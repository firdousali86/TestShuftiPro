/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState} from 'react';
import type {Node} from 'react';
import ShuftiPro from "react-native-shuftipro-kyc";

const App: () => Node = () => {

  const [shuftiProAT, setShuftiProAT] = useState();

  useEffect(() => {
    var token = btoa(
      "CLIENTID:SECRETKEY",
    ); //BASIC AUTH TOKEN
    //Dispatch request via fetch API or with whatever else which best suits for you
    fetch("https://api.shuftipro.com/get/access/token", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + token,
      },
    })
      .then(function (response) {
        return response.json().then(responseJson => {
          if (responseJson) {
            // if (callback) {
            //   callback(responseJson?.access_token);
            // }
            setShuftiProAT(responseJson?.access_token);
          }
        });
      })
      .then(function (data) {
        return data;
      });
  }, []);

  const verificationObj = {
    reference: Date.now(),
    country: "GB",
    language: "EN",
    email: "firdous.ali.tp@gmail.com",
    callback_url: "http://www.example.com",
    redirect_url: "http://www.example.com",
    show_consent: 1,
    show_results: 1,
    show_privacy_policy: 1,
    open_webview: false,
    face: true,
    document: {
      supported_types: ["id_card"],
      name: {
        first_name: "",
        last_name: "",
        middle_name: "",
      },
      dob: "",
      document_number: "",
      expiry_date: "",
      issue_date: "",
      fetch_enhanced_data: "",
      gender: "",
      backside_proof_required: "0",
    },
    background_checks: {},
    phone: {},
  };

  return (
    <ShuftiPro
      requestPayload={verificationObj}
      verificationMode={"image"}
      async={false}
      asyncResponseCallback={response => {
        console.log(shuftiProAT);
        console.log("Response : ", response);
      }}
      onResponseOkayButton={() => {
        console.log("Okay Btn");
      }}
      cancelBtn={() => {
        console.log("Cancel Btn");
      }}
      accessToken={shuftiProAT}
      // basicAuth={{
      //   client_id:
      //     "CLIENTID",
      //   secret_key:
      //     "SECRETKEY",
      // }}
    />
  );
};

export default App;

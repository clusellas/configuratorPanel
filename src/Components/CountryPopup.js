import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const CountryPopup = () => {
    const [country, setCountry] = useState(
        localStorage.getItem("userCountry") || ""
    );
    const [showPopup, setShowPopup] = useState(!country);
    const [showConsentPopup, setShowConsentPopup] = useState(false);
    const [consentGiven, setConsentGiven] = useState(
        localStorage.getItem("consentGiven") === "true"
    );

    const countries = [
        { label: "Afghanistan", value: "Afghanistan" },
        { label: "Albania", value: "Albania" },
        { label: "Algeria", value: "Algeria" },
        { label: "Andorra", value: "Andorra" },
        { label: "Angola", value: "Angola" },
        { label: "Antigua and Barbuda", value: "Antigua and Barbuda" },
        { label: "Argentina", value: "Argentina" },
        { label: "Armenia", value: "Armenia" },
        { label: "Australia", value: "Australia" },
        { label: "Austria", value: "Austria" },
        { label: "Azerbaijan", value: "Azerbaijan" },
        { label: "Bahamas", value: "Bahamas" },
        { label: "Bahrain", value: "Bahrain" },
        { label: "Bangladesh", value: "Bangladesh" },
        { label: "Barbados", value: "Barbados" },
        { label: "Belarus", value: "Belarus" },
        { label: "Belgium", value: "Belgium" },
        { label: "Belize", value: "Belize" },
        { label: "Benin", value: "Benin" },
        { label: "Bhutan", value: "Bhutan" },
        {
            label: "Bolivia (Plurinational State of)",
            value: "Bolivia (Plurinational State of)",
        },
        { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
        { label: "Botswana", value: "Botswana" },
        { label: "Brazil", value: "Brazil" },
        { label: "Brunei Darussalam", value: "Brunei Darussalam" },
        { label: "Bulgaria", value: "Bulgaria" },
        { label: "Burkina Faso", value: "Burkina Faso" },
        { label: "Burundi", value: "Burundi" },
        { label: "Cabo Verde", value: "Cabo Verde" },
        { label: "Cambodia", value: "Cambodia" },
        { label: "Cameroon", value: "Cameroon" },
        { label: "Canada", value: "Canada" },
        {
            label: "Central African Republic",
            value: "Central African Republic",
        },
        { label: "Chad", value: "Chad" },
        { label: "Chile", value: "Chile" },
        { label: "China", value: "China" },
        { label: "Colombia", value: "Colombia" },
        { label: "Comoros", value: "Comoros" },
        { label: "Congo", value: "Congo" },
        { label: "Costa Rica", value: "Costa Rica" },
        { label: "Côte d'Ivoire", value: "Côte d'Ivoire" },
        { label: "Croatia", value: "Croatia" },
        { label: "Cuba", value: "Cuba" },
        { label: "Cyprus", value: "Cyprus" },
        { label: "Czech Republic", value: "Czech Republic" },
        {
            label: "Democratic People's Republic of Korea",
            value: "Democratic People's Republic of Korea",
        },
        {
            label: "Democratic Republic of the Congo",
            value: "Democratic Republic of the Congo",
        },
        { label: "Denmark", value: "Denmark" },
        { label: "Djibouti", value: "Djibouti" },
        { label: "Dominica", value: "Dominica" },
        { label: "Dominican Republic", value: "Dominican Republic" },
        { label: "Ecuador", value: "Ecuador" },
        { label: "Egypt", value: "Egypt" },
        { label: "El Salvador", value: "El Salvador" },
        { label: "Equatorial Guinea", value: "Equatorial Guinea" },
        { label: "Eritrea", value: "Eritrea" },
        { label: "Estonia", value: "Estonia" },
        { label: "Eswatini", value: "Eswatini" },
        { label: "Ethiopia", value: "Ethiopia" },
        { label: "Fiji", value: "Fiji" },
        { label: "Finland", value: "Finland" },
        { label: "France", value: "France" },
        { label: "Gabon", value: "Gabon" },
        { label: "Gambia", value: "Gambia" },
        { label: "Georgia", value: "Georgia" },
        { label: "Germany", value: "Germany" },
        { label: "Ghana", value: "Ghana" },
        { label: "Greece", value: "Greece" },
        { label: "Grenada", value: "Grenada" },
        { label: "Guatemala", value: "Guatemala" },
        { label: "Guinea", value: "Guinea" },
        { label: "Guinea-Bissau", value: "Guinea-Bissau" },
        { label: "Guyana", value: "Guyana" },
        { label: "Haiti", value: "Haiti" },
        { label: "Honduras", value: "Honduras" },
        { label: "Hungary", value: "Hungary" },
        { label: "Iceland", value: "Iceland" },
        { label: "India", value: "India" },
        { label: "Indonesia", value: "Indonesia" },
        {
            label: "Iran (Islamic Republic of)",
            value: "Iran (Islamic Republic of)",
        },
        { label: "Iraq", value: "Iraq" },
        { label: "Ireland", value: "Ireland" },
        { label: "Israel", value: "Israel" },
        { label: "Italy", value: "Italy" },
        { label: "Jamaica", value: "Jamaica" },
        { label: "Japan", value: "Japan" },
        { label: "Jordan", value: "Jordan" },
        { label: "Kazakhstan", value: "Kazakhstan" },
        { label: "Kenya", value: "Kenya" },
        { label: "Kiribati", value: "Kiribati" },
        { label: "Kuwait", value: "Kuwait" },
        { label: "Kyrgyzstan", value: "Kyrgyzstan" },
        {
            label: "Lao People's Democratic Republic",
            value: "Lao People's Democratic Republic",
        },
        { label: "Latvia", value: "Latvia" },
        { label: "Lebanon", value: "Lebanon" },
        { label: "Lesotho", value: "Lesotho" },
        { label: "Liberia", value: "Liberia" },
        { label: "Libya", value: "Libya" },
        { label: "Liechtenstein", value: "Liechtenstein" },
        { label: "Lithuania", value: "Lithuania" },
        { label: "Luxembourg", value: "Luxembourg" },
        { label: "Madagascar", value: "Madagascar" },
        { label: "Malawi", value: "Malawi" },
        { label: "Malaysia", value: "Malaysia" },
        { label: "Maldives", value: "Maldives" },
        { label: "Mali", value: "Mali" },
        { label: "Malta", value: "Malta" },
        { label: "Marshall Islands", value: "Marshall Islands" },
        { label: "Mauritania", value: "Mauritania" },
        { label: "Mauritius", value: "Mauritius" },
        { label: "Mexico", value: "Mexico" },
        {
            label: "Micronesia (Federated States of)",
            value: "Micronesia (Federated States of)",
        },
        { label: "Monaco", value: "Monaco" },
        { label: "Mongolia", value: "Mongolia" },
        { label: "Montenegro", value: "Montenegro" },
        { label: "Morocco", value: "Morocco" },
        { label: "Mozambique", value: "Mozambique" },
        { label: "Myanmar", value: "Myanmar" },
        { label: "Namibia", value: "Namibia" },
        { label: "Nauru", value: "Nauru" },
        { label: "Nepal", value: "Nepal" },
        { label: "Netherlands", value: "Netherlands" },
        { label: "New Zealand", value: "New Zealand" },
        { label: "Nicaragua", value: "Nicaragua" },
        { label: "Niger", value: "Niger" },
        { label: "Nigeria", value: "Nigeria" },
        { label: "North Macedonia", value: "North Macedonia" },
        { label: "Norway", value: "Norway" },
        { label: "Oman", value: "Oman" },
        { label: "Pakistan", value: "Pakistan" },
        { label: "Palau", value: "Palau" },
        { label: "Panama", value: "Panama" },
        { label: "Papua New Guinea", value: "Papua New Guinea" },
        { label: "Paraguay", value: "Paraguay" },
        { label: "Peru", value: "Peru" },
        { label: "Philippines", value: "Philippines" },
        { label: "Poland", value: "Poland" },
        { label: "Portugal", value: "Portugal" },
        { label: "Qatar", value: "Qatar" },
        { label: "Republic of Korea", value: "Republic of Korea" },
        { label: "Republic of Moldova", value: "Republic of Moldova" },
        { label: "Romania", value: "Romania" },
        { label: "Russian Federation", value: "Russian Federation" },
        { label: "Rwanda", value: "Rwanda" },
        { label: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
        { label: "Saint Lucia", value: "Saint Lucia" },
        {
            label: "Saint Vincent and the Grenadines",
            value: "Saint Vincent and the Grenadines",
        },
        { label: "Samoa", value: "Samoa" },
        { label: "San Marino", value: "San Marino" },
        { label: "Sao Tome and Principe", value: "Sao Tome and Principe" },
        { label: "Saudi Arabia", value: "Saudi Arabia" },
        { label: "Senegal", value: "Senegal" },
        { label: "Serbia", value: "Serbia" },
        { label: "Seychelles", value: "Seychelles" },
        { label: "Sierra Leone", value: "Sierra Leone" },
        { label: "Singapore", value: "Singapore" },
        { label: "Slovakia", value: "Slovakia" },
        { label: "Slovenia", value: "Slovenia" },
        { label: "Solomon Islands", value: "Solomon Islands" },
        { label: "Somalia", value: "Somalia" },
        { label: "South Africa", value: "South Africa" },
        { label: "South Sudan", value: "South Sudan" },
        { label: "Spain", value: "Spain" },
        { label: "Sri Lanka", value: "Sri Lanka" },
        { label: "Sudan", value: "Sudan" },
        { label: "Suriname", value: "Suriname" },
        { label: "Sweden", value: "Sweden" },
        { label: "Switzerland", value: "Switzerland" },
        { label: "Syrian Arab Republic", value: "Syrian Arab Republic" },
        { label: "Tajikistan", value: "Tajikistan" },
        { label: "Thailand", value: "Thailand" },
        { label: "Timor-Leste", value: "Timor-Leste" },
        { label: "Togo", value: "Togo" },
        { label: "Tonga", value: "Tonga" },
        { label: "Trinidad and Tobago", value: "Trinidad and Tobago" },
        { label: "Tunisia", value: "Tunisia" },
        { label: "Turkey", value: "Turkey" },
        { label: "Turkmenistan", value: "Turkmenistan" },
        { label: "Tuvalu", value: "Tuvalu" },
        { label: "Uganda", value: "Uganda" },
        { label: "Ukraine", value: "Ukraine" },
        { label: "United Arab Emirates", value: "United Arab Emirates" },
        { label: "United Kingdom", value: "United Kingdom" },
        {
            label: "United Republic of Tanzania",
            value: "United Republic of Tanzania",
        },
        {
            label: "United States of America",
            value: "United States of America",
        },
        { label: "Uruguay", value: "Uruguay" },
        { label: "Uzbekistan", value: "Uzbekistan" },
        { label: "Vanuatu", value: "Vanuatu" },
        { label: "Venezuela", value: "Venezuela" },
        { label: "VietNam", value: "VietNam" },
        { label: "Yemen", value: "Yemen" },
        { label: "Zambia", value: "Zambia" },
        { label: "Zimbabwe", value: "Zimbabwe" },
    ];

    const handleCountryChange = (event, newValue) => {
        if (newValue) {
            if (consentGiven) {
                setCountry(newValue.value);
                localStorage.setItem("userCountry", newValue.value);
                setShowPopup(false);
            } else {
                setCountry(newValue.value);
                setShowConsentPopup(true);
            }
        }
    };

    const handleConsent = () => {
        localStorage.setItem("consentGiven", "true");
        localStorage.setItem("userCountry", country);
        setConsentGiven(true);
        setShowConsentPopup(false);
        setShowPopup(false);
    };

    useEffect(() => {
        if (localStorage.getItem("userCountry") && consentGiven) {
            setShowPopup(false);
        }
    }, [consentGiven]);

    return (
        <>
            <Dialog
                open={showPopup}
                onClose={() => setShowPopup(false)}
                PaperProps={{
                    style: {
                        width: "50%",
                        height: "40%",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
            >
                <DialogTitle>Por favor seleccione su país</DialogTitle>
                <DialogContent style={{ flexGrow: 1 }}>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={countries}
                            getOptionLabel={(option) => option.label}
                            value={
                                countries.find((c) => c.value === country) ||
                                null
                            }
                            onChange={handleCountryChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="País"
                                    autoFocus
                                    sx={{ marginTop: 1 }}
                                />
                            )}
                        />
                    </FormControl>
                </DialogContent>
            </Dialog>

            <Dialog
                open={showConsentPopup}
                onClose={() => setShowConsentPopup(false)}
                PaperProps={{
                    style: {
                        width: "50%",
                        height: "20%",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
            >
                <DialogTitle>Consentimiento de cookies</DialogTitle>
                <DialogContent style={{ flexGrow: 1 }}>
                    <p>
                        Para proporcionar una mejor experiencia, necesitamos su
                        consentimiento para almacenar su país.
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setShowConsentPopup(false)}
                        color="secondary"
                    >
                        Rechazar
                    </Button>
                    <Button onClick={handleConsent} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CountryPopup;

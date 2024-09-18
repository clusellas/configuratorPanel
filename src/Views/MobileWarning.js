import { Typography, Box, Button } from '@mui/material';



function MobileWarning ()  {
  
    return(        
        <Box
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="90vh" 
            textAlign="center"
            bgcolor="#f5f5f5"  // Fondo suave
            p={3}
        >



            <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
                ¡Oops! Esta aplicación no está disponible en móviles
            </Typography>

            <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                Por favor, accede desde un ordenador para disfrutar de la mejor experiencia.
            </Typography>

        </Box>
    );


}

export default MobileWarning;
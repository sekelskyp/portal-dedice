import {
    Box,
    Button,
    Container,
    Heading,
    Stack,
    Text,
  } from '@chakra-ui/react'

  import { WizardStepProps } from '../stepper_props'

  import { AccordionHelper } from './AccordionHelper'

const dummy_data = [
  {
    id: 1,
    title: 'Jak dlouho trvá, než notář toto jednání nařídí?',
    description: 'Na tuto otázku bohužel neexistuje jasná odpověď. Notář postupuje tak rychle, jak dokáže zjistit informace o majeteku zůstavitele. Je tedy závislý také na součinnosti bankovních institucí apod. Pokud jde vše bez problémů, je možné, že nařídí řízení za 1-2 měsíce po Předběžném šetření. Není ale výjimkou, že je tento časový úsek delší.',
  },
]
  
  export function WizardStepTen({ activeStep, setActiveStep }: WizardStepProps) {
    return (
      <Box>
        <Stack spacing={4} alignItems="center">
          <Container maxWidth="container.sm">
            <Heading as={"h3"} size='lg' py={4} px={12} textAlign={'center'}>Ne, vyčkejte, až vás notář kontaktuje s případnými dotazy k doplnění majetku.</Heading>
            <Text py={4} px={16} textAlign={'center'}>Notář Vás může případne kontaktovat již kvůli nařízení soudního jednání, které je standardně závěrem pozůstalostního řízení.</Text>
            <AccordionHelper items={dummy_data} />
          </Container>
        <Stack direction={"row"}>
          <Button
          colorScheme="red"
          onClick={() => setActiveStep(activeStep - 1)}
          >
            Zpět
          </Button>
          <Button
            colorScheme="primary"
            onClick={() => setActiveStep(activeStep + 1)}
          >
          Co obnáší soudní řízení?
          </Button>
        </Stack>
      </Stack>
    </Box>
    )
  }
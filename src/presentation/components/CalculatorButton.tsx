

import React from 'react'
import { Pressable, Text } from 'react-native'
import { colors, globalStyles } from '../../config/theme/app-theme';

//Propiedades de nuestro boton
interface Props {
    label:string;
    color?:string;
    doubleSize?: boolean;
    blackText?: boolean;
    onPress : () => void; //metodo para ejectuar al presionar
}



export const CalculatorButton = ({
    label,
    color = colors.darkGray, //por default 
    doubleSize= false,
    blackText = false,
    onPress,
}:Props) => {
  return (
    //cuando es un pressable al hacer la pressed espactimos nuesto globalstyle button yagregamos las props
    <Pressable 
        onPress={() => onPress()  }
        style={ ({pressed}) =>({ //regresamos un objeto implicito return{}
            ...globalStyles.button, //llamamos al boton
            backgroundColor:color,
            opacity: (pressed) ? 0.8 : 1, //cambiamos su opaciad cuado presionamos
            width: (doubleSize) ? 180 : 80, // doble del botonn que es 80
       
   })} >
        <Text style={{
           ...globalStyles.buttonText,
           color: (blackText) ? 'black' : 'white' 
        }} >{label}</Text>
    </Pressable>
  )
}



/**
 * style={() => {
 * return {
 *  ...
 * }
 * }}
 */
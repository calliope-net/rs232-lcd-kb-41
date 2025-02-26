input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    basic.setLedColor(0x0000ff)
    sendArray = []
    sendIndex = 0
    keyboardCode = 0
    keyboardIndex = 0
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, lcd16x2rgb.lcd16x2_text(""))
    textEingeben()
    textSenden()
    basic.turnRgbLedOff()
})
function textSenden () {
    if (sendArray.length > sendIndex) {
        rs232.sendeAsc(sendArray[sendIndex])
        lcd16x2rgb.setCursorCB(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, sendIndex, true, true)
        sendIndex += 1
    }
}
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    while (!(input.buttonIsPressed(Button.A)) && !(input.buttonIsPressed(Button.B))) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 3, pins.analogReadPin(AnalogPin.C16), lcd16x2rgb.eAlign.right)
        basic.pause(250)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    lcd16x2rgb.clearScreen(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
    basic.setLedColor(0xff0000)
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 15, rs232.empfangeText())
    basic.turnRgbLedOff()
})
input.onButtonEvent(Button.B, ButtonEvent.Hold, function () {
    basic.setLedColor(0xffff00)
    rs232.empfangAbbrechen(true)
    basic.turnRgbLedOff()
})
function textEingeben () {
    while (keyboardCode != 13 && keyboardIndex < 16) {
        keyboardCode = rs232.readCardKeyboard()
        if (rs232.between(keyboardCode, 32, 127)) {
            sendArray.push(keyboardCode)
            lcd16x2rgb.setCursor(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, keyboardIndex)
            lcd16x2rgb.writeLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), String.fromCharCode(keyboardCode))
            keyboardIndex += 1
        }
    }
    sendArray.push(13)
}
let keyboardIndex = 0
let keyboardCode = 0
let sendIndex = 0
let sendArray: number[] = []
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
rs232.setPins(DigitalPin.C17, AnalogPin.C16, 150)
rs232.setTakt(400)

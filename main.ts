input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    lcd16x2rgb.clearScreen(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
    basic.setLedColor(0xff0000)
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 15, rs232.empfangeText())
    basic.turnRgbLedOff()
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    basic.setLedColor(0x0000ff)
    rs232.sendeText("rs232-41", true)
    basic.turnRgbLedOff()
})
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
rs232.setPins(DigitalPin.C17, AnalogPin.C16, 150)
rs232.setTakt(400)

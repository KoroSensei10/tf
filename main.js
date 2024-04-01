let time = 0;
let slider;
let sliderFrequency;
let sliderFrequency2;
let circlePath = [];
let wave = [];

function signal(t, amp = 50) {
    let freq = sliderFrequency.value();
    let freq2 = sliderFrequency2.value();
    return amp * (sin(freq * t) + sin(freq2 * t));
}

function setup() {
    createCanvas(1000, 600);
    slider = createSlider(1, 12, 1);
    sliderFrequency = createSlider(1, 12, 3);
    sliderFrequency2 = createSlider(0, 12, 4);
}

function draw() {
    background(0);
    drawCircle();
    drawSignal();
    drawAmplitudeByFrequency();

    time += 0.05;
}

function drawSignal() {
    translate(0, -310);
    textSize(30);
    fill(100, 255, 100);
    text(`Fréquence = ${sliderFrequency.value()}Hz + ${sliderFrequency2.value()}Hz`, 150, -100);

    let y = signal(time);

    ellipse(0, y, 8);

    wave.unshift(y);

    // draw a path
    beginShape();
    noFill();
    stroke(255, 100);
    for (let i = 0; i < wave.length; i++) {
        vertex(i, wave[i]);
    }
    endShape();

    if (wave.length > 500) {
        wave.pop();
    }

}

function drawCircle() {
    translate(150, 450);
    fill(255, 100, 100);
    text(`Tours par fréquence = ${slider.value()}`, -140, 130);

    let radius = 100;
    let freq = slider.value();

    let x = radius * cos(freq * time + PI);
    let y = radius * sin(freq * time + PI);

    let arrowX = x * signal(time, 1);
    let arrowY = y * signal(time, 1);

    stroke(255, 100);
    noFill();
    ellipse(0, 0, radius * 2);

    stroke(255);
    line(0, 0, arrowX, arrowY);
    fill(100, 255, 100);
    ellipse(arrowX, arrowY, 8);
    noFill();

    circlePath.unshift(createVector(arrowX, arrowY));

    beginShape();
    noFill();
    stroke(255, 100);
    for (let v of circlePath) {
        vertex(v.x, v.y);
    }
    endShape();

    y_average = 0;
    for (let i = 0; i < 1000; i++) {
        let y = radius * sin(freq * i + PI);
        y_average += y * signal(i, 1);
    }
    y_average /= 1000;
    fill(255, 100, 100);
    ellipse(0, y_average, 8);

    if (circlePath.length > 500) {
        circlePath.pop();
    }
    noFill();
}

function drawAmplitudeByFrequency() {
    translate(200, 310);
    textSize(30);
    fill(100, 255, 100);
    text(`Tables des fréquences`, 50, -100);
    for (let i = 0; i < 12; i++) {
        noFill();
        if (i == slider.value()-1){
            fill(255, 100, 100);
        } else {
            fill(255, 255, 255);
        }
        text(`${i+1}`, i * 40, 100);
    }

    y_average = 0;
    let radius = 100;
    let tourByFrequency = slider.value();
    for (let i = 0; i < 1000; i++) {
        let y = radius * sin(tourByFrequency * i);
        y_average += y * signal(i, 1);
    }
    y_average /= 1000;

    fill(255, 100, 100);
    ellipse(10 + 40 * (slider.value()-1), 50 - y_average, 8);
    noFill();
}

/////////////////////////////////////////////////////////////////////////////////////////////
// Copyright 2023 Garmin International, Inc.
// Licensed under the Flexible and Interoperable Data Transfer (FIT) Protocol License; you
// may not use this file except in compliance with the Flexible and Interoperable Data
// Transfer (FIT) Protocol License.
/////////////////////////////////////////////////////////////////////////////////////////////
// ****WARNING****  This file is auto-generated!  Do NOT edit this file.
// Profile Version = 21.115Release
// Tag = production/release/21.115.00-0-gfe0a7f8
/////////////////////////////////////////////////////////////////////////////////////////////


import Utils from "./utils.js";

const mergeHeartRates = (hrMesgs, recordMesgs) => {

    if (hrMesgs == null || recordMesgs == null ||
        hrMesgs.length == 0 || recordMesgs.length == 0) {
        return;
    }

    const heartrates = expandHeartRates(hrMesgs);

    let heartrateIndex = 0;
    let recordRangeStartTime = null;

    for (let i = 0; i < recordMesgs.length; ++i) {
        const recordMesg = recordMesgs[i];

        let hrSum = 0;
        let hrSumCount = 0;

        const recordRangeEndTime = secondsSinceFitEpoch(recordMesg.timestamp);

        if (recordRangeStartTime == null) {
            recordRangeStartTime = recordRangeEndTime;
        }

        if (recordRangeStartTime === recordRangeEndTime) {
            recordRangeStartTime--;
            heartrateIndex = (heartrateIndex >= 1) ? heartrateIndex - 1 : 0;
        }

        let findingInRangeHrMesgs = true;
        while (findingInRangeHrMesgs && (heartrateIndex < heartrates.length)) {

            const heartrate = heartrates[heartrateIndex];

            // Check if the heartrate timestamp is gt record start time
            // and if the heartrate timestamp is lte to record end time
            if (heartrate.timestamp > recordRangeStartTime
                && heartrate.timestamp <= recordRangeEndTime) {
                hrSum += heartrate.heartRate;
                hrSumCount++;
            }
            // Check if the heartrate timestamp exceeds the record time
            else if (heartrate.timestamp > recordRangeEndTime) {
                findingInRangeHrMesgs = false;

                if (hrSumCount > 0) {
                    // Update record's heart rate value
                    const avgHR = Math.round(hrSum / hrSumCount);
                    recordMesg.heartRate = avgHR;

                }
                // Reset HR average accumulators
                hrSum = 0;
                hrSumCount = 0;

                recordRangeStartTime = recordRangeEndTime;

                // Breaks out of findingInRangeHrMesgs while loop w/o incrementing heartrateIndex
                break;
            }

            heartrateIndex++;
        }
    }
}

const expandHeartRates = (hrMesgs) => {
    const GAP_INCREMENT_MILLISECONDS = 250;
    const GAP_INCREMENT_SECONDS = GAP_INCREMENT_MILLISECONDS / 1000.0;
    const GAP_MAX_MILLISECONDS = 5000;
    const GAP_MAX_STEPS = GAP_MAX_MILLISECONDS / GAP_INCREMENT_MILLISECONDS;

    if (hrMesgs == null || hrMesgs.length == 0) {
        return [];
    }

    let anchorEventTimestamp = 0.0;
    let anchorTimestamp = null;

    const heartrates = [];
    hrMesgs.forEach(hrMesg => {
        if (hrMesg == null) {
            throwError("HR mesg must not be null");
        }

        const eventTimestamps = Array.isArray(hrMesg.eventTimestamp) ? hrMesg.eventTimestamp : [hrMesg.eventTimestamp];
        const filteredBpms = Array.isArray(hrMesg.filteredBpm) ? hrMesg.filteredBpm : [hrMesg.filteredBpm];

        // Update HR timestamp anchor, if present
        if (hrMesg.timestamp != null) {
            anchorTimestamp = secondsSinceFitEpoch(hrMesg.timestamp);

            if (hrMesg.fractionalTimestamp != null) {
                anchorTimestamp += hrMesg.fractionalTimestamp;
            }

            if (eventTimestamps.length == 1) {
                anchorEventTimestamp = eventTimestamps[0];
            } else {
                throwError("anchor HR mesg must have 1 event_timestamp");
            }
        }

        if (anchorTimestamp == null || anchorEventTimestamp == null) {
            // We cannot process any HR messages if we have not received a timestamp anchor
            throwError("no anchor timestamp received in a HR mesg before delta HR mesgs");
        } else if (eventTimestamps.length != filteredBpms.length) {
            throwError("HR mesg with mismatching event timestamp and filtered bpm");
        }

        for (let i = 0; i < eventTimestamps.length; i++) {
            let eventTimestamp = eventTimestamps[i];

            // Check to see if the event timestamp rolled over
            if (eventTimestamp < anchorEventTimestamp) {
                if ((anchorEventTimestamp - eventTimestamp) > (0x400000)) {
                    eventTimestamp += (0x400000);
                } else {
                    throwError("anchor event_timestamp is greater than subsequent event_timestamp. This does not allow for correct delta calculation.");
                }
            }

            const currentHr = { timestamp: anchorTimestamp, heartRate: filteredBpms[i] };
            currentHr.timestamp += (eventTimestamp - anchorEventTimestamp);

            // Carry the previous HR value forward across the gap to the current
            // HR value for up to 5 Seconds (5000ms) in 250ms increments
            if (heartrates.length > 0) {
                const previousHR = heartrates[heartrates.length - 1];
                let gapInMilliseconds = Math.abs(currentHr.timestamp - previousHR.timestamp) * 1000;
                let step = 1;
                while (gapInMilliseconds > GAP_INCREMENT_MILLISECONDS && step <= GAP_MAX_STEPS) {
                    const gapHR = { timestamp: previousHR.timestamp, heartRate: previousHR.heartRate };
                    gapHR.timestamp += (GAP_INCREMENT_SECONDS * step);
                    heartrates.push(gapHR);

                    gapInMilliseconds -= GAP_INCREMENT_MILLISECONDS;
                    step++;
                }
            }

            heartrates.push(currentHr);
        }
    });

    return heartrates;
}

const secondsSinceFitEpoch = (timestamp) => {
    if (timestamp instanceof Date) {
        return (timestamp.getTime() - Utils.FIT_EPOCH_MS) / 1000;
    }

    return timestamp;
}

const throwError = (error = "") => {
    throw Error(`FIT Runtime Error ${error}`.trimEnd());
}

export default { mergeHeartRates, expandHeartRates };
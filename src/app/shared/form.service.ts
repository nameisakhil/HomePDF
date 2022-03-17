import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormGroup,FormControl,FormArray,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private firebase:AngularFireDatabase, private router:Router) { }
  formList:AngularFireList<any>

  Form1 = new FormGroup({
    $key:new FormControl(null),
    sectionA: new FormGroup({
      'nameandAddress': new FormControl(null),
      'regdNo':new FormControl(null),
      'patientname': new FormControl(null),
      'age': new FormControl(null),
      'childrenGroup':new FormGroup({
        'noOfChildren':new FormControl(null),
        'livingSons':new FormControl(null),
        'livingDaughters': new FormControl(null),
      }),
      'otherName':new FormControl(null),
      'postalAddress':new FormControl(null),
      'referral':new FormGroup({
        'referredBy':new FormControl(null),
        'selfReferral':new FormControl(null),
      }),
      'lastDate':new FormControl(null),
    }),
    sectionB: new FormGroup({
        'docter_name': new FormControl(null,Validators.required),
      'indications':new FormControl(null),
      'checkBoxs':new FormGroup({
        'To diagnose intra-uterine and or ectopic pregnancy and confirm viability':new FormControl(null),
        'Estimation of gestational age (dating)':new FormControl(null),
        'Vaginal bleeding OR leaking':new FormControl(null),
        'Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure OR MTP failure':new FormControl(null),
        'Follow-up of cases of abortion':new FormControl(null),
        'Assessment of cervical canal and diameter of internal os':new FormControl(null),
        'Discrepancy between uterine size and period of amenorrhea':new FormControl(null),
        'Any suspected adenexal or uterine pathology OR abnormality':new FormControl(null),
        'Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up':new FormControl(null),
        'To evaluate fetal presentation and position':new FormControl(null),
        'Assessment of liquor amnii':new FormControl(null),
        'Preterm labor OR preterm premature rupture of membranes':new FormControl(null),
        'Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc':new FormControl(null),
        'Evaluation of umbilical cord presentation, insertion, nuchal encirclement, number of vessels and presence of true knot':new FormControl(null),
        'Evaluation of previous Caesarean Section scars':new FormControl(null),
        'Evaluation of fetal growth parameters, fetal weight and fetal well being':new FormControl(null),
        'Color flow mapping and duplex Doppler studies':new FormControl(null),
        'Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc and their follow-up':new FormControl(null),
        'Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc':new FormControl(null),
        'Observation of intra-partum events':new FormControl(null),
        'Medical or surgical conditions complicating pregnancy':new FormControl(null),
        'Research OR scientific studies in recognized institutions':new FormControl(null),
      }),
      'procedure':new FormControl(null),
      'otherProcedure':new FormArray([]),
      'dateOfDeclaration':new FormControl(null),
      'dateOfProcedure':new FormControl(null),
      'resultOfProcedure':new FormControl(null),
      'resultConveyedTo':new FormControl(null),
      'resultConveyedOn':new FormControl(null),
      'indication':new FormControl(null),
      'date':new FormControl(null),
      'place': new FormControl(null)
        }),
    sectionC: new FormGroup({
          'doctorName': new FormControl(null),
          'geneticHistory':new FormControl(null),
          'diagnosisProcedureIndications': new FormGroup({

            'chromosomalDisorders': new FormControl(null),
            'metabolicDisorders': new FormControl(null),
            'congenitalAnomaly': new FormControl(null),
            'mentalDisability': new FormControl(null),
            'Haemoglobinopathy': new FormControl(null),
            'sexLinkedDisorders': new FormControl(null),
            'singleGeneDisorder': new FormControl(null),
            'previousChildOrChildrenWithOthersDetail': new FormControl(null),
            'advancedMaternalAge': new FormControl(null),

            'mother': new FormControl(null),
            'father': new FormControl(null),
            'sibling': new FormControl(null),

            'preImplantationGenderDiagnosis': new FormControl(null),

            'diagnosisProcedureIndicationsOthersDetail': new FormControl(null)


          }),
          'pregnantWomanConsentDate': new FormControl(null),
          'invasiveProcedures': new FormGroup({
            'amniocentesis': new FormControl(null),
            'chorionicVilliAspiration': new FormControl(null),
            'fetalBiopsy': new FormControl(null),
            'Cordocentesis': new FormControl(null),

            'invasiveProceduresOthersDetail': new FormControl(null)

          }),
          'invasiveProcedureComplications': new FormControl(null),
          'recommendedAditionalTests': new FormGroup({
            'chromosomalStudies': new FormControl(null),
            'biochemicalStudies':new FormControl(null),
            'molecularStudies':new FormControl(null),
            'preImplantationGenderDiagnosis': new FormControl(null),

            'recommendedAditionalTestsOthersDetail': new FormControl(null)


          })

      }),
    sectionD: new FormGroup({
      'name':new FormControl(null),
      'diagnosis':new FormControl(null),
      'nameField':new FormControl(null),
      'date1': new FormControl(null),
      'nameField3':new FormControl(null),
      'age': new FormControl(null),
      'gender': new FormControl(null),
      'unknownField1':new FormControl(null),
      'unknownField2':new FormControl(null),
      'unknownField3':new FormControl(null),
      'relationship': new FormControl(null),
      'contactNumber':new FormControl(null),
      'unknownField4':new FormControl(null),
      'contactNumber2':new FormControl(null),
      'date2': new FormControl(null),
      'unknownField5': new FormControl(null),
      'date3': new FormControl(null),
      'nameField4': new FormControl(null),
      'nameField5': new FormControl(null),
      'date4': new FormControl(null)
    }),
  });


  getFormList(){
    this.formList = this.firebase.list('formlist');
    return this.formList.snapshotChanges();
  }


  insertUser(user){
    this.formList.push({
      'expand':false,
      'sectionA':({
        'nameandAddress':user.sectionA.nameandAddress,
        'regdNo':user.sectionA.regdNo,
        'patientname':user.sectionA.patientname,
        'age':user.sectionA.age,
        'childrenGroup':({
          'noOfChildren':user.sectionA.childrenGroup.noOfChildren,
          'livingSons':user.sectionA.childrenGroup.livingSons,
          'livingDaughters':user.sectionA.childrenGroup.livingDaughters,
        }),
        'otherName':user.sectionA.otherName,
        'postalAddress':user.sectionA.postalAddress,
        'referral':({
          'referredBy':user.sectionA.referral.referredBy,
          'selfReferral':user.sectionA.referral.selfReferral,
        }),
        'lastDate':user.sectionA.lastDate,
      }),
      'sectionB':({
        'docter_name':user.sectionB.docter_name,
        'checkBoxs':({
          'To diagnose intra-uterine and or ectopic pregnancy and confirm viability':user.sectionB.checkBoxs['To diagnose intra-uterine and or ectopic pregnancy and confirm viability'],
          'Estimation of gestational age (dating)':user.sectionB.checkBoxs['Estimation of gestational age (dating)'],
            'Vaginal bleeding OR leaking':user.sectionB.checkBoxs['Vaginal bleeding OR leaking'],
            'Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure OR MTP failure':user.sectionB.checkBoxs['Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure OR MTP failure'],
            'Follow-up of cases of abortion':user.sectionB.checkBoxs['Follow-up of cases of abortion'],
            'Assessment of cervical canal and diameter of internal os':user.sectionB.checkBoxs['Assessment of cervical canal and diameter of internal os'],
            'Discrepancy between uterine size and period of amenorrhea':user.sectionB.checkBoxs['Discrepancy between uterine size and period of amenorrhea'],
            'Any suspected adenexal or uterine pathology OR abnormality':user.sectionB.checkBoxs['Any suspected adenexal or uterine pathology OR abnormality'],
            'Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up':user.sectionB.checkBoxs['Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up'],
            'To evaluate fetal presentation and position':user.sectionB.checkBoxs['To evaluate fetal presentation and position'],
            'Assessment of liquor amnii':user.sectionB.checkBoxs['Assessment of liquor amnii'],
            'Preterm labor OR preterm premature rupture of membranes':user.sectionB.checkBoxs['Preterm labor OR preterm premature rupture of membranes'],
            'Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc':user.sectionB.checkBoxs['Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc'],
            'Evaluation of umbilical cord presentation, insertion, nuchal encirclement, number of vessels and presence of true knot':user.sectionB.checkBoxs['Evaluation of umbilical cord presentation, insertion, nuchal encirclement, number of vessels and presence of true knot'],
            'Evaluation of previous Caesarean Section scars':user.sectionB.checkBoxs['Evaluation of previous Caesarean Section scars'],
            'Evaluation of fetal growth parameters, fetal weight and fetal well being':user.sectionB.checkBoxs['Evaluation of fetal growth parameters, fetal weight and fetal well being'],
            'Color flow mapping and duplex Doppler studies':user.sectionB.checkBoxs['Color flow mapping and duplex Doppler studies'],
            'Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc and their follow-up'
            :user.sectionB.checkBoxs['Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc and their follow-up'],
            'Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc':
            user.sectionB.checkBoxs['Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc'],
            'Observation of intra-partum events':user.sectionB.checkBoxs['Observation of intra-partum events'],
            'Medical or surgical conditions complicating pregnancy':user.sectionB.checkBoxs['Medical or surgical conditions complicating pregnancy'],
            'Research OR scientific studies in recognized institutions':user.sectionB.checkBoxs['Research OR scientific studies in recognized institutions'],
        }),
        'procedure':user.sectionB.procedure,
          'otherProcedure':user.sectionB.otherProcedure,
          'dateOfDeclaration':user.sectionB.dateOfDeclaration,
          'dateOfProcedure':user.sectionB.dateOfProcedure,
          'resultOfProcedure':user.sectionB.resultOfProcedure,
          'resultConveyedTo':user.sectionB.resultConveyedTo,
          'resultConveyedOn':user.sectionB.resultConveyedOn,
          'indication':user.sectionB.indication,
          'date':user.sectionB.date,
          'place':user.sectionB. place,
      }),
      'sectionC':({
          'doctorName': user.sectionC.doctorName,
          'geneticHistory':user.sectionC.geneticHistory,
          'diagnosisProcedureIndications':({
            'chromosomalDisorders': user.sectionC.diagnosisProcedureIndications.chromosomalDisorders,
            'metabolicDisorders': user.sectionC.diagnosisProcedureIndications.metabolicDisorders,
            'congenitalAnomaly': user.sectionC.diagnosisProcedureIndications.congenitalAnomaly,
            'mentalDisability': user.sectionC.diagnosisProcedureIndications.mentalDisability,
            'Haemoglobinopathy': user.sectionC.diagnosisProcedureIndications.Haemoglobinopathy,
            'sexLinkedDisorders': user.sectionC.diagnosisProcedureIndications.sexLinkedDisorders,
            'singleGeneDisorder': user.sectionC.diagnosisProcedureIndications.singleGeneDisorder,
            'previousChildOrChildrenWithOthersDetail': user.sectionC.diagnosisProcedureIndications.previousChildOrChildrenWithOthersDetail,
            'advancedMaternalAge': user.sectionC.diagnosisProcedureIndications.advancedMaternalAge,
            'mother': user.sectionC.diagnosisProcedureIndications.mother,
            'father': user.sectionC.diagnosisProcedureIndications.father,
            'sibling': user.sectionC.diagnosisProcedureIndications.sibling,
            'preImplantationGenderDiagnosis': user.sectionC.diagnosisProcedureIndications.preImplantationGenderDiagnosis,
            'diagnosisProcedureIndicationsOthersDetail':user.sectionC.diagnosisProcedureIndications.diagnosisProcedureIndicationsOthersDetail,
          }),
          'pregnantWomanConsentDate': user.sectionC.pregnantWomanConsentDate,
          'invasiveProcedures':({
            'amniocentesis': user.sectionC.invasiveProcedures.amniocentesis,
            'chorionicVilliAspiration': user.sectionC.invasiveProcedures.chorionicVilliAspiration,
            'fetalBiopsy': user.sectionC.invasiveProcedures.fetalBiopsy,
            'Cordocentesis': user.sectionC.invasiveProcedures.Cordocentesis,
            'invasiveProceduresOthersDetail':user.sectionC.invasiveProcedures.invasiveProceduresOthersDetail,
          }),
          'invasiveProcedureComplications': user.sectionC.invasiveProcedureComplications,
          'recommendedAditionalTests':({
            'chromosomalStudies': user.sectionC.recommendedAditionalTests.chromosomalStudies,
            'biochemicalStudies':user.sectionC.recommendedAditionalTests.biochemicalStudies,
            'molecularStudies':user.sectionC.recommendedAditionalTests.molecularStudies,
            'preImplantationGenderDiagnosis':user.sectionC.recommendedAditionalTests.preImplantationGenderDiagnosis ,
            'recommendedAditionalTestsOthersDetail': user.sectionC.recommendedAditionalTests.recommendedAditionalTestsOthersDetail,
          }),

      }),
      'sectionD':({
        'name':user.sectionD.name,
          'diagnosis':user.sectionD.diagnosis,
          'nameField':user.sectionD.nameField,
          'date1': user.sectionD.date1,
          'nameField3':user.sectionD.nameField3,
          'age': user.sectionD.age,
          'gender': user.sectionD.gender,
          'unknownField1':user.sectionD.unknownField1,
          'unknownField2':user.sectionD.unknownField2,
          'unknownField3':user.sectionD.unknownField3,
          'relationship': user.sectionD.relationship,
          'contactNumber':user.sectionD.contactNumber,
          'unknownField4':user.sectionD.unknownField4,
          'contactNumber2':user.sectionD.contactNumber2,
          'date2': user.sectionD.date2,
          'unknownField5': user.sectionD.unknownField5,
          'date3': user.sectionD.date3,
          'nameField4': user.sectionD.nameField4,
          'nameField5': user.sectionD.nameField5,
          'date4': user.sectionD.date4
      }),
    })
  }

  updateUser(user){
    this.formList.update(user.$key,{
      'expand':false,
      'sectionA':({
        'nameandAddress':user.sectionA.nameandAddress,
        'regdNo':user.sectionA.regdNo,
        'patientname':user.sectionA.patientname,
        'age':user.sectionA.age,
        'childrenGroup':({
          'noOfChildren':user.sectionA.childrenGroup.noOfChildren,
          'livingSons':user.sectionA.childrenGroup.livingSons,
          'livingDaughters':user.sectionA.childrenGroup.livingDaughters,
        }),
        'otherName':user.sectionA.otherName,
        'postalAddress':user.sectionA.postalAddress,
        'referral':({
          'referredBy':user.sectionA.referral.referredBy,
          'selfReferral':user.sectionA.referral.selfReferral,
        }),
        'lastDate':user.sectionA.lastDate,
      }),
      'sectionB':({
        'docter_name':user.sectionB.docter_name,
        'checkBoxs':({
          'To diagnose intra-uterine and or ectopic pregnancy and confirm viability':user.sectionB.checkBoxs['To diagnose intra-uterine and or ectopic pregnancy and confirm viability'],
          'Estimation of gestational age (dating)':user.sectionB.checkBoxs['Estimation of gestational age (dating)'],
            'Vaginal bleeding OR leaking':user.sectionB.checkBoxs['Vaginal bleeding OR leaking'],
            'Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure OR MTP failure':user.sectionB.checkBoxs['Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure OR MTP failure'],
            'Follow-up of cases of abortion':user.sectionB.checkBoxs['Follow-up of cases of abortion'],
            'Assessment of cervical canal and diameter of internal os':user.sectionB.checkBoxs['Assessment of cervical canal and diameter of internal os'],
            'Discrepancy between uterine size and period of amenorrhea':user.sectionB.checkBoxs['Discrepancy between uterine size and period of amenorrhea'],
            'Any suspected adenexal or uterine pathology OR abnormality':user.sectionB.checkBoxs['Any suspected adenexal or uterine pathology OR abnormality'],
            'Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up':user.sectionB.checkBoxs['Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up'],
            'To evaluate fetal presentation and position':user.sectionB.checkBoxs['To evaluate fetal presentation and position'],
            'Assessment of liquor amnii':user.sectionB.checkBoxs['Assessment of liquor amnii'],
            'Preterm labor OR preterm premature rupture of membranes':user.sectionB.checkBoxs['Preterm labor OR preterm premature rupture of membranes'],
            'Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc':user.sectionB.checkBoxs['Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc'],
            'Evaluation of umbilical cord presentation, insertion, nuchal encirclement, number of vessels and presence of true knot':user.sectionB.checkBoxs['Evaluation of umbilical cord presentation, insertion, nuchal encirclement, number of vessels and presence of true knot'],
            'Evaluation of previous Caesarean Section scars':user.sectionB.checkBoxs['Evaluation of previous Caesarean Section scars'],
            'Evaluation of fetal growth parameters, fetal weight and fetal well being':user.sectionB.checkBoxs['Evaluation of fetal growth parameters, fetal weight and fetal well being'],
            'Color flow mapping and duplex Doppler studies':user.sectionB.checkBoxs['Color flow mapping and duplex Doppler studies'],
            'Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc and their follow-up'
            :user.sectionB.checkBoxs['Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc and their follow-up'],
            'Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc':
            user.sectionB.checkBoxs['Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc'],
            'Observation of intra-partum events':user.sectionB.checkBoxs['Observation of intra-partum events'],
            'Medical or surgical conditions complicating pregnancy':user.sectionB.checkBoxs['Medical or surgical conditions complicating pregnancy'],
            'Research OR scientific studies in recognized institutions':user.sectionB.checkBoxs['Research OR scientific studies in recognized institutions'],
        }),
        'procedure':user.sectionB.procedure,
          'otherProcedure':user.sectionB.otherProcedure,
          'dateOfDeclaration':user.sectionB.dateOfDeclaration,
          'dateOfProcedure':user.sectionB.dateOfProcedure,
          'resultOfProcedure':user.sectionB.resultOfProcedure,
          'resultConveyedTo':user.sectionB.resultConveyedTo,
          'resultConveyedOn':user.sectionB.resultConveyedOn,
          'indication':user.sectionB.indication,
          'date':user.sectionB.date,
          'place':user.sectionB. place,
      }),
      'sectionC':({
          'doctorName': user.sectionC.doctorName,
          'geneticHistory':user.sectionC.geneticHistory,
          'diagnosisProcedureIndications':({
            'chromosomalDisorders': user.sectionC.diagnosisProcedureIndications.chromosomalDisorders,
            'metabolicDisorders': user.sectionC.diagnosisProcedureIndications.metabolicDisorders,
            'congenitalAnomaly': user.sectionC.diagnosisProcedureIndications.congenitalAnomaly,
            'mentalDisability': user.sectionC.diagnosisProcedureIndications.mentalDisability,
            'Haemoglobinopathy': user.sectionC.diagnosisProcedureIndications.Haemoglobinopathy,
            'sexLinkedDisorders': user.sectionC.diagnosisProcedureIndications.sexLinkedDisorders,
            'singleGeneDisorder': user.sectionC.diagnosisProcedureIndications.singleGeneDisorder,
            'previousChildOrChildrenWithOthersDetail': user.sectionC.diagnosisProcedureIndications.previousChildOrChildrenWithOthersDetail,
            'advancedMaternalAge': user.sectionC.diagnosisProcedureIndications.advancedMaternalAge,
            'mother': user.sectionC.diagnosisProcedureIndications.mother,
            'father': user.sectionC.diagnosisProcedureIndications.father,
            'sibling': user.sectionC.diagnosisProcedureIndications.sibling,
            'preImplantationGenderDiagnosis': user.sectionC.diagnosisProcedureIndications.preImplantationGenderDiagnosis,
            'diagnosisProcedureIndicationsOthersDetail':user.sectionC.diagnosisProcedureIndications.diagnosisProcedureIndicationsOthersDetail,
          }),
          'pregnantWomanConsentDate': user.sectionC.pregnantWomanConsentDate,
          'invasiveProcedures':({
            'amniocentesis': user.sectionC.invasiveProcedures.amniocentesis,
            'chorionicVilliAspiration': user.sectionC.invasiveProcedures.chorionicVilliAspiration,
            'fetalBiopsy': user.sectionC.invasiveProcedures.fetalBiopsy,
            'Cordocentesis': user.sectionC.invasiveProcedures.Cordocentesis,
            'invasiveProceduresOthersDetail':user.sectionC.invasiveProcedures.invasiveProceduresOthersDetail,
          }),
          'invasiveProcedureComplications': user.sectionC.invasiveProcedureComplications,
          'recommendedAditionalTests':({
            'chromosomalStudies': user.sectionC.recommendedAditionalTests.chromosomalStudies,
            'biochemicalStudies':user.sectionC.recommendedAditionalTests.biochemicalStudies,
            'molecularStudies':user.sectionC.recommendedAditionalTests.molecularStudies,
            'preImplantationGenderDiagnosis':user.sectionC.recommendedAditionalTests.preImplantationGenderDiagnosis ,
            'recommendedAditionalTestsOthersDetail': user.sectionC.recommendedAditionalTests.recommendedAditionalTestsOthersDetail,
          }),

      }),
      'sectionD':({
        'name':user.sectionD.name,
          'diagnosis':user.sectionD.diagnosis,
          'nameField':user.sectionD.nameField,
          'date1': user.sectionD.date1,
          'nameField3':user.sectionD.nameField3,
          'age': user.sectionD.age,
          'gender': user.sectionD.gender,
          'unknownField1':user.sectionD.unknownField1,
          'unknownField2':user.sectionD.unknownField2,
          'unknownField3':user.sectionD.unknownField3,
          'relationship': user.sectionD.relationship,
          'contactNumber':user.sectionD.contactNumber,
          'unknownField4':user.sectionD.unknownField4,
          'contactNumber2':user.sectionD.contactNumber2,
          'date2': user.sectionD.date2,
          'unknownField5': user.sectionD.unknownField5,
          'date3': user.sectionD.date3,
          'nameField4': user.sectionD.nameField4,
          'nameField5': user.sectionD.nameField5,
          'date4': user.sectionD.date4
      }),
    })
  }

  populateForm(user){
    this.router.navigate(['/form-f']);
    this.Form1.patchValue(user);
  }

  deleteUser($key){
    this.formList.remove($key);
  }
}


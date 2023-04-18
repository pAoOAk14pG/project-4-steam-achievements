import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

export default function Home() {
  return (
    <Formik
      initialValues={{ AppID: '', SteamID: '' }}
      validationSchema={Yup.object({
        AppID: Yup.number()
          .required('This field is required')
          .min(10, 'Invalid AppID: AppID value too small')
          .integer('Invalid AppID: AppID is not an integer')
          .test('divisible-by-ten', 'Invalid AppID: AppIDs for games always end in a 0', (AppID) => (AppID % 10 === 0)),
        SteamID: Yup.number()
          .required('This field is required')
          .min(10000000000000000, 'Invalid SteamID: 64 bit Steam IDs (in decimal form) have 17 digits')
          .max(90000000000000000, 'Invalid SteamID: 64 bit Steam IDs (in decimal form) have 17 digits')
          // In reality the range is more like 76,561,100,000,000 to 76,561,300,000,000
          // But I'm not entirely sure so this should be fine
          .integer('Invalid SteamID: Steam IDs is not an integer')
      })}
      onSubmit={(values) => axios({
        method: 'GET',
        url: `api/GetPlayerAchievements?AppID=${values.AppID}&SteamID=${values.SteamID}`,
        data: values
      }).then(() => {
        console.log(values)
      })}
    >
      {
        ({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="AppID">AppID:</label>
              <Field id="AppID" name="AppID" className={`form-control ${errors?.AppID && touched?.AppID && 'is-invalid'}`} />
              <ErrorMessage component="div" name="AppID" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="SteamID">SteamID64:</label>
              <Field id="SteamID" name="SteamID" className={`form-control ${errors?.SteamID && touched?.SteamID && 'is-invalid'}`} />
              <ErrorMessage component="div" name="SteamID" className="invalid-feedback" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )
      }
    </Formik>
  )
}

'use client';

import { useState } from 'react'

import Form from '@components/Form';

const program = () => {
  const [submit, setSubmit] = useState(false);
  const [request, setRequest] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e) => {

  }

  return (
    <Form
      request = {request}
      setRequest = {setRequest}
      submit = {submit}
      handleSubmit = {createPrompt}
    />
  )
}

export default program
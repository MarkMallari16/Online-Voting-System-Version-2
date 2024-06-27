import { Avatar, Dialog, DialogBody, DialogFooter, DialogHeader, Select, Button } from '@material-tailwind/react'
import React from 'react'
import InputLabel from './InputLabel'
import TextInput from './TextInput'
import InputError from './InputError'

function UpdateCandidateModal({ openUpdateModal, handleUpdateOpen, handleUpdateSubmit, data, setData, DefaultCandidatePicture, partylist_list, position_list, errors, processing }) {
  return (
    <Dialog
      size="xl"
      open={openUpdateModal}
      handler={handleUpdateOpen}
      className="overflow-y-auto md:h-[95vh] "
    >
      <form onSubmit={handleUpdateSubmit}>
        <DialogHeader>
          Update Candidate
        </DialogHeader>
        <hr />
        <DialogBody>
          <div>
            <div className="mb-2">
              <InputLabel
                htmlFor="candidateUpdateProfile"
                value="Update Candidate Profile"
                className="mb-4"
              />
              <div className="flex items-center gap-3">
                <div className="mb-2">
                  <Avatar
                    src={
                      data.candidate_profile instanceof File
                        ? URL.createObjectURL(data.candidate_profile)
                        : (data.candidate_profile ? data.candidate_profile : DefaultCandidatePicture)
                    }
                    alt="Candidate Avatar"
                    size="xxl"

                    withBorder={true}
                    className="border-none"
                  />

                </div>

                <div>
                  <label
                    htmlFor="candidateImage"
                    className="relative cursor-pointer bg-gray-300 rounded-md font-medium py-2 px-4 mb-2 inline-flex items-center"
                  >
                    <span className="mr-2">
                      Choose a file
                    </span>
                    <input
                      type="file"
                      id="candidateImage"
                      name="candidate_profile"
                      className="hidden"
                      onChange={(e) => setData({ ...data, candidate_profile: e.target.files[0] })}
                    />
                  </label>


                </div>

              </div>
              <InputError className="mt-1" message={errors.candidate_profile} />
            </div>

            <div className="md:flex md:flex-wrap md:gap-2">
              <div className="flex-1">
                <InputLabel
                  htmlFor="firstName"
                  value="Enter Candidate First Name"
                />

                <TextInput
                  id="firstName"
                  className="mt-1 block w-full"
                  name="first_name"
                  value={
                    data.first_name ||
                    ""
                  }
                  onChange={(e) =>
                    setData(
                      "first_name",
                      e.target.value
                    )
                  }

                  autoFocus
                  autoComplete="firstName"
                />

                <InputError className="mt-2" message={errors.first_name} />
              </div>

              <div className="flex-1">
                <InputLabel
                  htmlFor="middleName"
                  value="Enter Candidate Middle Name (optional)"
                />

                <TextInput
                  id="middleName"
                  className="mt-1 block w-full"
                  value={
                    data.middle_name ||
                    ""
                  }
                  name="middle_name"
                  onChange={(e) =>
                    setData(
                      "middle_name",
                      e.target.value
                    )
                  }

                  autoFocus
                  autoComplete="middleName"
                />

                <InputError className="mt-2" message={errors.middle_name} />
              </div>

              <div className="flex-1">
                <InputLabel
                  htmlFor="lastName"
                  value="Enter Candidate Last Name"
                />

                <TextInput
                  id="lastName"
                  className="mt-1 block w-full"
                  name="last_name"
                  value={
                    data.last_name || ""
                  }
                  onChange={(e) =>
                    setData(
                      "last_name",
                      e.target.value
                    )
                  }
                  required
                  autoFocus
                  autoComplete="lastName"
                />

                <InputError className="mt-2" message={errors.last_name} />
              </div>
            </div>

            <div className="mt-4">
              <Select
                label="Select Partylist"
                value={data.partylist_id}
                onChange={(e) =>
                  setData(
                    "partylist_id",
                    e
                  )
                }
                name="partylist"
              >
                {partylist_list?.map(
                  (list) => (
                    <Option
                      key={list.id}
                      value={list.id}
                    >
                      {list?.name}
                    </Option>
                  )
                )}
              </Select>

              <InputError className="mt-2" />
            </div>

            <div className="mt-4">

              <Select
                label="Select Position"
                value={data.position_id}
                onChange={(e) =>
                  setData(
                    "position_id",
                    e
                  )
                }
                name="position"
              >
                {position_list?.map(
                  (list) => (
                    <Option
                      key={list.id}
                      value={list.id}
                    >
                      {list.name}
                    </Option>
                  )
                )}

              </Select>

              <InputError className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel
                htmlFor="lastName"
                value="Enter Candidate Platform"
              />
              <textarea
                className="w-full rounded-md resize-none h-40 mt-1"

                size="lg"
                label="Enter Candidate Platform"
                value={data.manifesto}
                onChange={(e) =>
                  setData(
                    "manifesto",
                    e.target.value
                  )
                }
                name="manifesto"
              />
              <InputError className="mt-1" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleUpdateOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            type="submit"
            disabled={processing}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default UpdateCandidateModal
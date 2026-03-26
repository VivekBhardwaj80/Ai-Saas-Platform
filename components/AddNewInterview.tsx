"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  const [jobExperience, setJobExperience] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const handleStartInterview = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("Position", jobPosition);
      formData.append("Desc", jobDesc);
      formData.append("Experience", jobExperience);
      const result = await axios.post("/api/interview/start", formData);
      console.log(result)
      if(result.data?.interview){
        setLoading(false)
        toast.success("Interview started successfully")
        setOpenDialog(false)
        setJobPosition("");
        setJobDesc("");
        setJobExperience('');
      }
      else{
        toast.error(result.data?.interview?.message || "something went wrong")
      }
    } catch (error:any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    }
    finally{
      setLoading(false)
    }
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale105 hover:shadow-md cursor-pointer transition-all "
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl!">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about job you are interviewing
            </DialogTitle>
            <DialogDescription>
              Add Details about job position, Your skills and Year of experience
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleStartInterview}>
            <div className="mt-5 my-3">
              <label htmlFor="role">Job Role/Job Position</label>
              <Input
                placeholder="Ex. Full Stack Developer"
                id="role"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="description">
                Job Description/ Tech Stack (In Short)
              </label>
              <Textarea
                placeholder="Ex. React, NodeJs, Nextjs, MongoDB etc"
                id="description"
                required
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label htmlFor="experience">Years of experience</label>
              <Input
                placeholder="Ex. 2"
                type="number"
                id="experience"
                max={50}
                required
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                size="lg"
                className="cursor-pointer"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" className="cursor-pointer" disabled={loading}>
                {loading ? "Starting..." : "Start Interview"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;

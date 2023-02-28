const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(200).json({ jobs, count: jobs.length });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(201).json({ job });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    res.status(404).json({ message: `Job with id:${jobId} not found` });
  }
  res.status(200).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  //check if a value is provided for company and position
  if (company === "" || position === "") {
    res.status(400).json("Company or Position fields cannot be empty");
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    res.status(404).json(`no job with id; ${jobId}`);
  }

  res.status(200).json(req.body);
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findByIdAndRemove(
    { _id: jobId },
    { createdBy: userId }
  );
  if (!job) {
    res.status(400).json(`job with id: ${id} does not exist`);
  }
  res.status(200).json(req.body);
};

module.exports = { getAllJobs, createJob, getJob, updateJob, deleteJob };

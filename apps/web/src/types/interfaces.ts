export interface PredictResult {
  id: number
  start_time: Date
  end_time: Date
  inserted_at: Date
  vibration_anomaly_score: number
  current_anomaly_score: number
  anomaly_score: number
  threshold: number
  is_anomaly: boolean
  x_max?: number
  x_rms?: number
  x_std?: number
  x_crest_factor?: number
  x_impact_factor?: number
  x_mean_square_frequency?: number
  x_mean_power_spectrum?: number
  y_max?: number
  y_rms?: number
  y_std?: number
  y_crest_factor?: number
  y_impact_factor?: number
  y_mean_square_frequency?: number
  y_mean_power_spectrum?: number
  z_max?: number
  z_rms?: number
  z_std?: number
  z_crest_factor?: number
  z_impact_factor?: number
  z_mean_square_frequency?: number
  z_mean_power_spectrum?: number
  pf_p2p_1?: number
  pf_p2p_2?: number
  pf_p2p_3?: number
  pf_rms_1?: number
  pf_rms_2?: number
  pf_rms_3?: number
  current_rms_1?: number
  current_rms_2?: number
  current_rms_3?: number
  voltage_rms_1?: number
  voltage_rms_2?: number
  voltage_rms_3?: number
}

export interface ModelEvaluation {
  id: number
  model: string
  created_date: Date
  duration: number
  parameters: Record<string, any>
}

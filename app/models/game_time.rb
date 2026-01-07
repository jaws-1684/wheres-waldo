class GameTime < ApplicationRecord
  belongs_to :user
  def <=> (other)
    m_s1 = self.best_time.split(":")
    m_s2 = other.best_time.split(":")
    minutes1 = m_s1.first
    seconds1 = m_s1.last

    minutes2 = m_s2.first
    seconds2 = m_s2.last
    res = minutes1 <=> minutes2
    res == 0 ? seconds1 <=> seconds2 : res
  end
end

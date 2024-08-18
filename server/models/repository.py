from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class RepositoryConfig(BaseModel):
    repo_name: str
    robot_id: Optional[str]
    created_at: datetime 
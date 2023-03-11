"""empty message

Revision ID: 7db267df1b32
Revises: 98b9f0c3d7ed
Create Date: 2023-03-09 00:43:56.042968

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7db267df1b32'
down_revision = '98b9f0c3d7ed'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('films', schema=None) as batch_op:
        batch_op.alter_column('opening_crawl',
               existing_type=sa.VARCHAR(length=250),
               type_=sa.String(length=1000),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('films', schema=None) as batch_op:
        batch_op.alter_column('opening_crawl',
               existing_type=sa.String(length=1000),
               type_=sa.VARCHAR(length=250),
               existing_nullable=True)

    # ### end Alembic commands ###